import json
import requests
import csv
from geopy.distance import geodesic

def get_crop_data(api_key, state_fips, county_fips):
    # URL for the NASS Quick Stats API
    url = f"http://quickstats.nass.usda.gov/api/api_GET/?key={api_key}&source_desc=CENSUS&sector_desc=CROPS&group_desc=FIELD%20CROPS&statisticcat_desc=PRODUCTION&agg_level_desc=COUNTY&state_fips_code={state_fips}&county_code={county_fips}&year__GE=2020&format=json"

    # Make the API request
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")
    
    # Parse the JSON response
    data = response.json()['data']

    with open('testdataJson.json', 'w') as json_file:
        json.dump(data, json_file)

    # Process the data to find the production of each crop
    crop_productions = {}
    
    def get_production(record):
            try:
                return int(record['Value'].replace(",", "")) if record['Value'] != "(D)" else 0
            except ValueError:
                return 0
            
    for record in data:
        crop = record['commodity_desc']
        production = get_production(record)
        if crop in crop_productions:
            crop_productions[crop] += production
        else:
            crop_productions[crop] = production

    return crop_productions

def simulate_crop_distribution(crop_productions, total_blocks):
    crops_per_block = []
    total_production = sum(crop_productions.values())
    
    # Calculate area proportion for each crop
    for crop, production in crop_productions.items():
        proportion = production / total_production
        blocks_for_crop = int(proportion * total_blocks)
        crops_per_block.extend([crop] * blocks_for_crop)
    
    # If there are any remaining blocks, assign them randomly to the crops
    remaining_blocks = total_blocks - len(crops_per_block)
    if remaining_blocks > 0:
        crops_list = list(crop_productions.keys())
        crops_per_block.extend(crops_list[:remaining_blocks])
    
    return crops_per_block

def divide_roi_into_blocks(top_left, bottom_right, block_side):
    blocks = []
    lat, lon = top_left
    end_lat, end_lon = bottom_right
    
    # Calculate the number of blocks along latitude and longitude
    lat_distance = geodesic((lat, lon), (end_lat, lon)).meters
    lon_distance = geodesic((lat, lon), (lat, end_lon)).meters
    num_lat_blocks = int(lat_distance // block_side)
    num_lon_blocks = int(lon_distance // block_side)

    lat_step = (top_left[0] - bottom_right[0]) / num_lat_blocks
    lon_step = (bottom_right[1] - top_left[1]) / num_lon_blocks
    
    for i in range(num_lat_blocks):
        for j in range(num_lon_blocks):
            block_top_left = (lat - i * lat_step, lon + j * lon_step)
            blocks.append(block_top_left)
    
    return blocks

def main():
    # Replace with your actual API key
    api_key = "52389A85-A8AF-3214-AD79-A51E0BAC5CDB"

    # FIPS codes for California and Sacramento County
    state_fips = "06"
    county_fips = "067"

    # Define the geographical coordinates of the top-left and bottom-right corners of the ROI
    top_left = (40.0, -122.5)  # Approximate coordinates for top-left
    bottom_right = (39.0, -121.5)  # Approximate coordinates for bottom-right

    # Define the side length of each block in meters
    block_side = 1000  # meters

    crop_productions = get_crop_data(api_key, state_fips, county_fips)

    print("Crop production data retrieved:")
    for crop, production in crop_productions.items():
        print(f"{crop}: {production}")

    blocks = divide_roi_into_blocks(top_left, bottom_right, block_side)
    crops_per_block = simulate_crop_distribution(crop_productions, len(blocks))

    # Print the coordinates and crop for each block

    with open('2023.csv', 'w', newline='') as csvfile:
        fieldnames = ['longitude', 'latitude', 'crop']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for i, block in enumerate(blocks):
            latitude, longitude = block
            crop = crops_per_block[i]
            writer.writerow({'longitude': longitude, 'latitude': latitude, 'crop': crop})

if __name__ == "__main__":
    main()