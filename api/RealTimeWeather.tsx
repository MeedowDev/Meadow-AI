import { LocationObject } from "expo-location";

// Function to get current weather data from WeatherAPI
export async function getCurrentWeather(location: LocationObject) {
	const { latitude, longitude } = location.coords;

	// WeatherAPI URL with dynamic latitude and longitude
	const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;

	// Request options with API headers
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '43be076a8cmsh789928ad6c015fep1d44cbjsnb05d0ff63051', // Your API key
			'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
		},
	};

	try {
		const response = await fetch(apiUrl, options);
		if (!response.ok) {
			throw new Error("Failed to fetch current weather data");
		}
		const weatherData = await response.json();
		return weatherData;
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}

// Function to get weather forecast (for daily, future data) from WeatherAPI
export async function getWeatherForecastByCoords(latitude: number, longitude: number) {
	// Construct the WeatherAPI URL for the current weather
	const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;

	// Request options with API headers
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '43be076a8cmsh789928ad6c015fep1d44cbjsnb05d0ff63051', // Your API key
			'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
		},
	};

	console.log("latitude", latitude);
	console.log("longitude", longitude);
	console.log("API URL:", apiUrl); // Log the constructed URL for debugging

	try {
		const response = await fetch(apiUrl, options);
		if (!response.ok) {
			throw new Error("Failed to fetch weather forecast");
		}

		const weatherData = await response.json();
		console.log(weatherData);
		return JSON.stringify(weatherData); // Return the actual weather data
	} catch (error) {
		console.error("Error fetching weather forecast: ", error);
		throw error;
	}
}
