import pandas as pd
import numpy as np
import logging
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

# List of CSV files to process (example paths)
csv_files = [
    r'Arkansas_Phillips_2020_1.csv',
    r'Arkansas_Phillips_2020_2.csv',
    r'Arkansas_Phillips_2020_3.csv',
    r'Arkansas_Phillips_2020_4.csv',
    r'Arkansas_Phillips_2020_5.csv',
    r'Arkansas_Phillips_2020_6.csv',
    r'Arkansas_Phillips_2020_7.csv',
    r'Arkansas_Phillips_2020_8.csv',
    r'Arkansas_Phillips_2020_9.csv',
    r'Arkansas_Phillips_2020_10.csv',
    r'Arkansas_Phillips_2020_11.csv',
    r'Arkansas_Phillips_2020_12.csv',
]

# Initialize an empty list to store the results
results = []

# Iterate through each CSV file
for csv_file in csv_files:
    # Extract filename and then log logging
    filename = os.path.splitext(os.path.basename(csv_file))[0]
    logging.info(f'Processing file: {filename}')

    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Iterate over each row in the dataframe
    for idx, row in df.iterrows():
        lon = row['Longitude']
        lat = row['Latitude']
        crop = row['Crop']
        plant_month = row['Plant_Month']
        growing_duration = row['Growing_Duration']

        # Calculate the number of months per quarter
        months_per_quarter = growing_duration / 4.0

        # Initialize dictionaries to store quarterly data
        quarters = {
            'Q1': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
            'Q2': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
            'Q3': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []},
            'Q4': {'Max_Temperature': [], 'Min_Temperature': [], 'Transpiration': [], 'Wind_Speed': [], 'Humidity': []}
        }

        # Function to determine quarter based on plant_month and growing_duration
        def get_quarter(plant_month, current_month, growing_duration):
            month_in_season = ((current_month - plant_month) % growing_duration) + 1
            quarter_index = int((month_in_season - 1) // months_per_quarter)
            quarters = ['Q1', 'Q2', 'Q3', 'Q4']
            return quarters[quarter_index]

        # Iterate through metrics and add values to respective quarters
        for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
            for month in range(1, 13):
                quarter = get_quarter(plant_month, month, growing_duration)
                quarters[quarter][metric].append(row[metric])

        # Calculate averages for each quarter
        row_result = []
        for quarter in ['Q1', 'Q2', 'Q3', 'Q4']:
            for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
                if quarters[quarter][metric]:  # Check if there are values to average
                    avg_value = np.mean(quarters[quarter][metric])
                else:
                    avg_value = 'unknown'  # Assign "unknown" if there are no values
                    logging.warning(f'No valid data for {quarter}({metric}) in region ({lon}, {lat})')
                row_result.append(avg_value)

        # Append crop, longitude, and latitude to row_result
        row_result.append(crop)

        # Append row_result to results list
        results.append(row_result)

# Determine columns dynamically based on the number of metrics and quarters
columns = []
for quarter in ['Q1', 'Q2', 'Q3', 'Q4']:
    for metric in ['Max_Temperature', 'Min_Temperature', 'Transpiration', 'Wind_Speed', 'Humidity']:
        columns.append(f'{quarter}({metric})')
columns.append('Crop')

# Create DataFrame from results
results_df = pd.DataFrame(results, columns=columns)

# Replace 'unknown' with empty string before saving to CSV
results_df.replace('unknown', '', inplace=True)

# Save results to CSV
output_file = 'regional_quarterly_averages.csv'
results_df.to_csv(output_file, index=False)

logging.info(f'Results saved to {output_file}')
