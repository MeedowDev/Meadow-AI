import { LocationObject } from "expo-location";

// Function to get weather data from OpenMeteo API
export async function getWeatherForecast(location: LocationObject) {
    console.log("Fetching weather for location:", location);
    const { latitude, longitude } = location.coords;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean&timezone=auto`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

// Function to calculate quarter means
function getQuarterMeans(data: any, start: number, end: number) {
    const QMaxTemperature = data.daily.temperature_2m_max.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);
    const QMinTemperature = data.daily.temperature_2m_min.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);
    const QHumidity = data.daily.relative_humidity_2m_mean.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);
    return { QMaxTemperature, QMinTemperature, QHumidity };
}

// Function to handle weather data and comparison
export default async function promptHandled(location: LocationObject, idealConditions: { minTemp: number; maxTemp: number; humidity: number }) {

    if (!location) {
        console.error("Location is not defined");
        return; // Exit the function if location is not available
    }

    try {
        const weatherData = await getWeatherForecast(location);
        const length = weatherData.daily.time.length;
        const quarter = Math.floor(length / 4);

        // Initialize accumulators for overall weather conditions
        let totalMaxTemp = 0;
        let totalMinTemp = 0;
        let totalHumidity = 0;

        console.log("Ideal Conditions:", idealConditions);

        for (let i = 0; i < 4; i++) {
            const quarterData = getQuarterMeans(weatherData, quarter * i, quarter * (i + 1) - 1);
            totalMaxTemp += quarterData.QMaxTemperature;
            totalMinTemp += quarterData.QMinTemperature;
            totalHumidity += quarterData.QHumidity;
            console.log(`Quarter ${i + 1} Data:, quarterData`);
        }

        // Calculate the overall means across the four quarters
        const overallMaxTemp = totalMaxTemp / 4;
        const overallMinTemp = totalMinTemp / 4;
        const overallHumidity = totalHumidity / 4;

        const overallConditions = {
            QMaxTemperature: overallMaxTemp,
            QMinTemperature: overallMinTemp,
            QHumidity: overallHumidity
        };

        console.log("Overall Conditions:", overallConditions);

        // You might want to return overallConditions for further usage
        return overallConditions;

    } catch (error) {
        console.error("Error in handling weather data or comparison:", error);
        throw error;}
}