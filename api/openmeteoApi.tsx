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
		return weatherData;
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}
