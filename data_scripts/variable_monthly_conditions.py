import ee
import geemap
import geopandas as gpd
import pandas as pd
from datetime import datetime

# Initialize the Earth Engine module.
try:
    ee.Initialize(project='clevaenergy-a')
except Exception as e:
    ee.Authenticate()

# Define the coordinates for the entire Sacramento Valley region.
roi = ee.Geometry.Rectangle([-123.0, 35.0, -119.0, 40.7])

# Function to get the start and end dates of a month
def get_month_date_range(year, month):
    start_date = datetime(year, month, 1).strftime('%Y-%m-%d')
    if month == 12:
        end_date = datetime(year + 1, 1, 1).strftime('%Y-%m-%d')
    else:
        end_date = datetime(year, month + 1, 1).strftime('%Y-%m-%d')
    return start_date, end_date

# Define the year for which to collect data.
year = 2023

# Loop through each month of the year.
for month in range(1, 13):
    # Get the start and end dates for the current month.
    startDate, endDate = get_month_date_range(year, month)
    
    # Load the relevant datasets from Google Earth Engine.
    dataset = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H') \
        .filterBounds(roi) \
        .filterDate(startDate, endDate)
    
    # Calculate the mean for the month.
    monthlyMean = dataset.mean()
    
    # Select the necessary bands (adjust these band names as needed).
    temperature = monthlyMean.select('Tair_f_inst')
    transpiration = monthlyMean.select('Evap_tavg')  # Example band for transpiration
    windSpeed = monthlyMean.select('Wind_f_inst')
    humidity = monthlyMean.select('Qair_f_inst')
    
    # Create a multi-band image with the selected data.
    multiBandImage = temperature.rename('Temperature') \
        .addBands(transpiration.rename('Transpiration')) \
        .addBands(windSpeed.rename('Wind_Speed')) \
        .addBands(humidity.rename('Humidity'))
    
    # Sample points within the ROI (adjust the number of points as needed).
    points = multiBandImage.sample(region=roi, scale=1000, numPixels=100, geometries=True)
    
    # Get the feature collection of sampled points.
    points = points.getInfo()
    
    # Extract the sampled data and prepare it for CSV export.
    data = []
    for feature in points['features']:
        coords = feature['geometry']['coordinates']
        props = feature['properties']
        data.append([coords[0], coords[1], props['Temperature'], props['Transpiration'], props['Wind_Speed'], props['Humidity']])
    
    # Create a DataFrame from the extracted data.
    df = pd.DataFrame(data, columns=['Longitude', 'Latitude', 'Temperature', 'Transpiration', 'Wind_Speed', 'Humidity'])
    
    # Export the DataFrame to CSV.
    csv_filename = f'sacramento_conditions_{year}_{month}.csv'
    df.to_csv(csv_filename, index=False)
    
    print(f"Data for {startDate} to {endDate} has been exported to {csv_filename}")