# import pandas as pd
# from simpledbf import Dbf5

# # Path to your .TIF.vat.dbf file
# dbf_path = 'clipped.TIF.vat.dbf'

# # Convert the DBF file to a DataFrame
# dbf = Dbf5(dbf_path)
# df = dbf.to_dataframe()

# # Specify the output CSV file path
# csv_path = 'clipped_data_attributes.csv'

# # Save the DataFrame as a CSV file
# df.to_csv(csv_path, index=False)

# print(f"DBF file has been successfully converted to CSV and saved to {csv_path}")


import pandas as pd
import geopandas as gpd

def convert_dbf_to_csv(dbf_file, csv_file):
    # Read the .dbf file using Geopandas
    dbf = gpd.read_file(dbf_file)
    
    # Convert the Geopandas DataFrame to a Pandas DataFrame
    df = pd.DataFrame(dbf)
    
    # Save the DataFrame to a CSV file
    df.to_csv(csv_file, index=False)
    print(f"Converted {dbf_file} to {csv_file}")

# Specify the .dbf file and the desired output CSV file
dbf_file = 'clipped.TIF.vat.dbf'
csv_file = 'clipped_vat.csv'

# Convert the .dbf file to CSV
convert_dbf_to_csv(dbf_file, csv_file)