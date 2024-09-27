import os
import numpy as np
import pandas as pd
import logging
from geopy.distance import geodesic  # To calculate proximity between locations

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

# Load reference temperatures for Carlifonia_Fresno_2020_7.csv
REFERENCE_FILE = r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_7.csv'
reference_df = pd.read_csv(REFERENCE_FILE)
reference_lon = reference_df['Longitude'].mean()  # Assuming a representative longitude/latitude
reference_lat = reference_df['Latitude'].mean()
reference_max_temp = reference_df['Max_Temperature'].mean()
reference_min_temp = reference_df['Min_Temperature'].mean()

# Set realistic temperature thresholds
MAX_TEMP_THRESHOLD = 50
MIN_TEMP_THRESHOLD = -10

# List of your CSV files 
csv_files = [
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_1.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_2.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_3.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_4.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_5.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_6.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_7.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_8.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_10.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_11.csv',
    r'C:\Users\ADMIN\clevaApp\Carlifonia_Fresno_2020_12.csv',
]

# Initialize a dictionary to accumulate data for each crop in each region
region_data = {}

# Function to calculate distance between two lat/lon pairs
def calculate_proximity(lon1, lat1, lon2, lat2):
    return geodesic((lat1, lon1), (lat2, lon2)).kilometers

# Function to filter out outliers using IQR
def filter_outliers(series):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return series.clip(lower=lower_bound, upper=upper_bound)

# Function to adjust temperature based on proximity to Carlifonia_Fresno_2020_7.csv
def adjust_temperature_based_on_proximity(lon, lat, temp, reference_temp):
    proximity = calculate_proximity(lon, lat, reference_lon, reference_lat)
    if proximity < 100:  # If the crop is within 100 km of Carlifonia_Fresno_2020_7.csv
        # Adjust temperature towards the reference value based on proximity
        weight = (100 - proximity) / 100
        return temp * (1 - weight) + reference_temp * weight
    return temp

# Iterate through each CSV file and accumulate data for each crop and region
for csv_file in csv_files:
    filename = os.path.splitext(os.path.basename(csv_file))[0]
    logging.info(f'Processing file: {filename}')

    df = pd.read_csv(csv_file)

    # Filter out outliers in Max and Min Temperatures
    df['Max_Temperature'] = filter_outliers(df['Max_Temperature'])
    df['Min_Temperature'] = filter_outliers(df['Min_Temperature'])

    # Filter temperatures within a realistic range
    df['Max_Temperature'] = df['Max_Temperature'].apply(lambda x: np.nan if x < MIN_TEMP_THRESHOLD or x > MAX_TEMP_THRESHOLD else x)
    df['Min_Temperature'] = df['Min_Temperature'].apply(lambda x: np.nan if x < MIN_TEMP_THRESHOLD or x > MAX_TEMP_THRESHOLD else x)

    for idx, row in df.iterrows():
        lon = row['Longitude']
        lat = row['Latitude']
        crop = row['Crop']
        plant_month = row['Plant_Month']
        growing_duration = row['Growing_Duration']
        region_key = (lon, lat, crop)

        if region_key not in region_data:
            region_data[region_key] = {
                'Plant_Month': plant_month,
                'Growing_Duration': growing_duration,
                'metrics': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
                'quarters': {
                    'Q1': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
                    'Q2': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
                    'Q3': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
                    'Q4': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []}
                }
            }

        # Update metrics, adjusting temperatures for proximity to Carlifonia_Fresno_2020_7.csv
        for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
            value = row[metric]
            if not np.isnan(value):
                # Apply proximity-based adjustment only for Max and Min Temperature
                if metric == 'Max_Temperature':
                    value = adjust_temperature_based_on_proximity(lon, lat, value, reference_max_temp)
                elif metric == 'Min_Temperature':
                    value = adjust_temperature_based_on_proximity(lon, lat, value, reference_min_temp)
                region_data[region_key]['metrics'][metric].append(value)

# Distribute unique values across quarters for each region
for region_key, data in region_data.items():
    for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
        values = data['metrics'][metric]
        unique_values = list(set(values))

        for i, value in enumerate(unique_values):
            quarter_index = i % 4  # Cycle through quarters
            quarter = ['Q1', 'Q2', 'Q3', 'Q4'][quarter_index]
            data['quarters'][quarter][metric].append(value)

# Calculate averages and compile results for each region
results = []

for region_key, data in region_data.items():
    lon, lat, crop = region_key
    row_result = []

    for quarter in ['Q1', 'Q2', 'Q3', 'Q4']:
        for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
            quarter_data = data['quarters'][quarter][metric]
            if quarter_data:
                avg_value = np.mean(quarter_data)
            else:
                avg_value = "unknown"
                logging.warning(f'No valid data for {quarter}({metric}) for crop {crop}')
            row_result.append(avg_value)

    row_result.extend([crop, lon, lat])
    results.append(row_result)

# Create a DataFrame from the results
columns = []
for quarter in ['Q1', 'Q2', 'Q3', 'Q4']:    
    for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
        columns.append(f'{quarter}({metric})')
columns.extend(['Crop', 'Longitude', 'Latitude'])

results_df = pd.DataFrame(results, columns=columns)

# Save the results to a CSV file
results_df.to_csv('final_quarterly_averages_by_region.csv', index=False)

print(f"Results saved to 'final_quarterly_averages_by_region.csv'.")
