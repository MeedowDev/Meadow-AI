import ee
import pandas as pd
import json
from tqdm import tqdm
from datetime import datetime
import logging

# Initialize logging
logging.basicConfig(filename='sampled_data_logs.txt', level=logging.INFO, format='%(asctime)s - %(message)s')

# Initialize Earth Engine
print("Greetings from Steph👊🏽 \n\n")
print("Authenticating...")
try:
    ee.Initialize(project='stephmwangi0')
except Exception as e:
    ee.Authenticate()
    ee.Initialize()

logging.info("Authenticated successfully")
print("Authentication successful")

# Define the coordinates for the entire Sacramento Valley region
roi = ee.Geometry.Rectangle([-123.0, 35.0, -119.0, 40.7])

# Function to get the start and end dates of a month
def get_month_date_range(year, month):
    start_date = datetime(year, month, 1).strftime('%Y-%m-%d')
    if month == 12:
        end_date = datetime(year + 1, 1, 1).strftime('%Y-%m-%d')
    else:
        end_date = datetime(year, month + 1, 1).strftime('%Y-%m-%d')
    return start_date, end_date

year = 2020  # Change this to get the desired year

# Load crop data from CSV
crop_data = pd.read_csv(r'C:\Users\ADMIN\Documents\Clevaenergydata\2020_crops_CA_Fresno.csv')
crop_data.set_index(['longitude', 'latitude'], inplace=True)

# Load crop analysis data from JSON
with open(r'C:\Users\ADMIN\clevaApp\ClevagyEnergy\data_scripts\crop_analysis.json') as f:
    crop_analysis = json.load(f)

# Convert crop analysis to a dictionary for faster lookup
crop_analysis_dict = {item['crop']: item for item in crop_analysis}

number_of_months = 7  # 12 for all the months
sample_size = 2000 # Use None to get the whole dataset, or specify the number of samples per month

for month in range(6, (number_of_months + 1)):
    # Example of another environmental dataset
    start_date, end_date = get_month_date_range(year, month)
    dataset = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H').filterBounds(roi).filterDate(start_date, end_date)
    monthly_mean = dataset.mean()
    temperature = monthly_mean.select('Tair_f_inst')
    transpiration = monthly_mean.select('Evap_tavg')
    windSpeed = monthly_mean.select('Wind_f_inst')
    humidity = monthly_mean.select('Qair_f_inst')

    max_temperature = dataset.select('Tair_f_inst').max()
    min_temperature = dataset.select('Tair_f_inst').min()

    # Kelvin to Celsius conversion
    temperature = temperature.subtract(273.15)
    max_temperature = max_temperature.subtract(273.15)
    min_temperature = min_temperature.subtract(273.15)

    # Create a multi-band image combining the datasets
    multi_band_image = temperature.rename('Temperature') \
        .addBands(max_temperature.rename('Max_Temperature')) \
        .addBands(min_temperature.rename('Min_Temperature')) \
        .addBands(transpiration.rename('Transpiration')) \
        .addBands(windSpeed.rename('Wind_Speed')) \
        .addBands(humidity.rename('Humidity'))

    # Function to get sample data
    def get_sample_data(coords, scale):
        point = ee.Geometry.Point(coords)
        sample = multi_band_image.sample(region=point, scale=scale, numPixels=1, geometries=True).first().getInfo()
        return sample

    # Read coordinates from a JSON file
    with open(r'c:\Users\ADMIN\Documents\Clevaenergydata\block_coordinates.json') as f:
        data = json.load(f)
        coordinates = [(d['longitude'], d['latitude']) for d in data]

    data = []
    logging.info('Processing coordinates...')

    if sample_size:
        coordinates = coordinates[:sample_size]

    print(f'Processing data for month {month}...')
    scale = 1000  # Increase the scale to reduce accuracy and computational load
    for coord in tqdm(coordinates):
        sample = get_sample_data(coord, scale)
        if sample:
            props = sample['properties']
            crop = crop_data.loc[coord].crop if coord in crop_data.index else None
            plant_month = crop_analysis_dict[crop]['planting_month'] if crop in crop_analysis_dict else None
            growing_duration = crop_analysis_dict[crop]['growing_duration_months'] if crop in crop_analysis_dict else None
            data.append({
                'Longitude': coord[0],
                'Latitude': coord[1],
                'Temperature': props.get('Temperature'),
                'Max_Temperature': props.get('Max_Temperature'),
                'Min_Temperature': props.get('Min_Temperature'),
                'Transpiration': props.get('Transpiration'),
                'Wind_Speed': props.get('Wind_Speed'),
                'Humidity': props.get('Humidity'),
                'Crop': crop,
                'Plant_Month': plant_month,
                'Growing_Duration': growing_duration
            })
            logging.info(f'Processed coordinates: {coord}')

    # Convert to DataFrame and save to CSV
    df = pd.DataFrame(data)
    df.to_csv(f'Fresno_County_CA_{year}_{month}.csv', index=False)
    logging.info(f'Fresno County, Carlifonia varying data for month {month} saved to CSV.')
