import os
import numpy as np
import pandas as pd
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

# List of CSV files to process (example paths)
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

# Function to determine quarter based on the plant_month , the crops current_month and growing_duration
def get_quarter(plant_month, current_month, growing_duration):
    months_per_quarter = growing_duration / 4.0
    #in this season which months are there?
    month_in_season = ((current_month - plant_month) % growing_duration) + 1
    quarter_index = int((month_in_season - 1) // months_per_quarter)
    quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    return quarters[quarter_index]

# Iterate through each CSV file and accumulate data for each crop and region
for csv_file in csv_files:
    filename = os.path.splitext(os.path.basename(csv_file))[0]
    logging.info(f'Processing file: {filename}')

    df = pd.read_csv(csv_file)

    for idx, row in df.iterrows():
        lon = row['Longitude']
        lat = row['Latitude']
        crop = row['Crop']
        plant_month = row['Plant_Month']
        growing_duration = row['Growing_Duration']
        region_key = (lon, lat, crop)
        
        #added crop in region data to my empty dictionary
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

        # goes through each and every row data and updates the value of our dictionary  with values in metrics
        for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
            value = row[metric]
            if not np.isnan(value):
                region_data[region_key]['metrics'][metric].append(value)


# Distribute unique values across quarters for each region
for region_key, data in region_data.items():
    plant_month = data['Plant_Month']
    growing_duration = data['Growing_Duration']

    for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
        values = data['metrics'][metric]
        unique_values = list(set(values))

        #We retrieve the values of each metric and compute its unique values
        for i, value in enumerate(unique_values):
            quarter_index = i % 4  # Cycle through quarters
            quarter = ['Q1', 'Q2', 'Q3', 'Q4'][quarter_index]
            data['quarters'][quarter][metric].append(value)

# Calculate averages and compile results for each region
results = []

for region_key, data in region_data.items():
    lon, lat, crop = region_key
    row_result = []

    #here all my regions and its data are looked into
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

# Determine columns dynamically based on the number of metrics and quarters
columns = []
#dynamically creating quarter names
for quarter in ['Q1', 'Q2', 'Q3', 'Q4']:
    for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
        columns.append(f'{quarter}({metric})')
columns.extend(['Crop', 'Longitude', 'Latitude'])

# Create a DataFrame from the results
results_df = pd.DataFrame(results, columns=columns)

# Save the results to a CSV file
results_df.to_csv('quarterly_averages_by_region.csv', index=False)

print(f"Results saved to 'quarterly_averages_by_region.csv'.")
