import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import { getWeatherIcon } from "../components/weatherCard";
import { getSeasonBasedOnWeather } from "./setSeasons";


export default async function handleFetchSeason(latitude: number, longitude: number) {
	try {
		// Fetch the weather data based on coordinates
		const rawWeatherData = await getWeatherInfo(latitude, longitude);

		// Check if daily data is available
		if (!rawWeatherData || !rawWeatherData.daily) {
			console.error("Weather data or daily field is undefined.");
			return null; // Return null if no valid data
		}

		const dailyData = rawWeatherData.daily;
		const currentWeatherCondition = rawWeatherData?.current?.weather?.[0]?.description || rawWeatherData?.daily?.weather?.condition || null;

		if (!currentWeatherCondition) {
			console.error("Current weather condition is not available.");
		} else {
			console.log("Current Weather:", currentWeatherCondition);
			// Normalize and fetch the appropriate weather icon
			const normalizedCondition = currentWeatherCondition.toLowerCase();
			const weatherIcon = getWeatherIcon(normalizedCondition);
			console.log("Rendered Weather Icon:", weatherIcon);
		}
		// Check if each of the required fields exists
		const hasValidDailyData =
			dailyData.temperature_2m_max &&
			dailyData.temperature_2m_min &&
			dailyData.wind_speed_10m_mean &&
			dailyData.relative_humidity_2m_mean &&
			Array.isArray(dailyData.temperature_2m_max) &&
			Array.isArray(dailyData.temperature_2m_min) &&
			Array.isArray(dailyData.wind_speed_10m_mean) &&
			Array.isArray(dailyData.relative_humidity_2m_mean);

		if (!hasValidDailyData) {
			console.error("One or more required daily weather data arrays are missing or not valid.");
			return null; // Exit if required arrays are not available
		}

		const length = dailyData.time.length;
		if (length === 0) {
			console.error("No daily data available.");
			return null; // Exit if no data is available
		}

		const start = 0; // Example start index
		const end = length; // Example end index

		// Calculate the season based on the weather data
		const season = getSeasonBasedOnWeather(rawWeatherData, start, end);
		//my current season
		console.log("Determined Season: ", season);

		return { season }; // Returning season data
	} catch (error) {
		console.error("Error in fetchSeaseon: ", error);
		return null; // Handle error gracefully
	}
}

const getWeatherInfo = async (latitude: number, longitude: number) => {
	const weatherData = await getWeatherForecastByCoords(latitude, longitude);
	return weatherData;
};
