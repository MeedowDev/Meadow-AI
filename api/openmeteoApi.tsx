import { LocationObject } from "expo-location";

// Function to get weather data from OpenMeteo API
export async function getWeatherForecast(location: LocationObject) {
	const { latitude, longitude } = location.coords;
	const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch weather data");
		}
		const weatherData = await response.json();
		console.log("Weather Forecast:", weatherData); // Log the weather data here
		return weatherData;
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}

export async function getWeatherForecastByCoords(latitude: number, longitude: number) {
	// Get today's date and calculate the end date (6 months in the future)

	// return "Function confirmed, but not implemented yet";
	const startDate = new Date();
	const endDate = new Date();
	endDate.setMonth(startDate.getMonth() + 6);

	// Format the dates to YYYY-MM-DD
	const formattedStartDate = startDate.toISOString().split("T")[0];
	const formattedEndDate = endDate.toISOString().split("T")[0];

	// Build the API URL with the specified parameters
	const apiUrl = `https://climate-api.open-meteo.com/v1/climate?latitude=52.52&longitude=13.41&start_date=2024-09-26&end_date=2025-02-26&models=MRI_AGCM3_2_S&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_mean,relative_humidity_2m_mean`;

	// console.log("latitude", latitude);
	// console.log("longitude", longitude);
	// console.log("API URL:", apiUrl); // Log the constructed URL for debugging

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch weather data");
		}

		const weatherData = await response.json();
		console.log("Open meteo api",weatherData)
		return weatherData; // Return the actual weather data
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}