
import requests


def get_weather_data(lat, lon):
    api_key = 'b10500a352eb23c8c4ac6d762757488c'
    url = "https://api.weatherstack.com/current?access_key={b10500a352eb23c8c4ac6d762757488c}"
    response = requests.get(url)
    
    print(response.status_code)  # This will show the status code of the API response
    
    if response.status_code == 200:
        weather_data = response.json()
        print(weather_data)  # Print the entire weather data response for inspection
        return weather_data
    else:
        print(f"Failed to fetch weather data: {response.status_code}")
        return None
