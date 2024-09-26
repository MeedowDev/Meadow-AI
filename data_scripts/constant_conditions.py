import ee
import pandas as pd

# Initialize the Earth Engine module.
try:
    ee.Initialize(project='clevaenergy-a')
except Exception as e:
    ee.Authenticate()
    ee.Initialize()

# Load the SRTM dataset
srtm = ee.Image('USGS/SRTMGL1_003')

# Get the elevation data
elevation = srtm.select('elevation')

# Calculate the slope
slope = ee.Terrain.slope(elevation)

# Define a smaller region of interest (AOI) using specific coordinates
roi = ee.Geometry.Rectangle([-123.0, 35.0, -119.0, 40.7])

# Function to handle exporting elevation data within the specified rectangle
def export_elevation_data(region):
    # Sample the elevation and slope within the specified rectangle
    sample = elevation.addBands(slope).sample(
        region=region,
        scale=1000,  # Increase scale to reduce number of samples
        #numPixels=1000,  # Limit the number of samples
        geometries=True
    )

    # Extract the sampled elevation and slope data and prepare it for CSV export
    def create_feature(feature):
        feature = ee.Feature(feature)
        coords = feature.geometry().coordinates()
        elev = feature.get('elevation')
        slp = feature.get('slope')
        return {
            'Latitude': coords.get(1).getInfo(),
            'Longitude': coords.get(0).getInfo(),
            'Elevation (m)': elev.getInfo(),
            'Slope (degrees)': slp.getInfo()
        }

    feature_list = sample.toList(sample.size())
    size = sample.size().getInfo()
    data = [create_feature(feature_list.get(i)) for i in range(size)]

    # Create a DataFrame from the extracted data
    df = pd.DataFrame(data)

    # Define CSV filename
    csv_filename = 'elevation_data.csv'

    # Export the DataFrame to CSV
    df.to_csv(csv_filename, index=False)
    print(f"Elevation data has been exported to {csv_filename}")

# Call the export_elevation_data function with the specified ROI
export_elevation_data(roi)
