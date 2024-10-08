import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import { getSeasonBasedOnWeather } from "./setSeasons";

const Key = "OnRFCsfVfzrUsXZiItV1lkPFbDPbJbqJ4UfSWFpYj0fL";

export default async function handleScoreModel(latitude: number, longitude: number) {
    try {
        // Fetch the weather data based on coordinates
        const rawWeatherData = await getWeatherInfo(latitude, longitude);

        // Check if daily data is available
        if (!rawWeatherData || !rawWeatherData.daily) {
            console.error("Weather data or daily field is undefined.");
            return null; // Return null if no valid data
        }

        console.log("Fetched Weather Data: ", JSON.stringify(rawWeatherData, null, 2));

        const dailyData = rawWeatherData.daily;

        // Check if each of the required fields exists
        const hasValidDailyData = dailyData.temperature_2m_max &&
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
        console.error("Error in handleScoreModel: ", error);
        return null; // Handle error gracefully
    }
}

function getQuarterMeans(data: any, start: number, end: number) {
    try {
        if (!data || !data.daily) {
            console.error("Invalid data or missing daily data.");
            return null;
        }

        const daily = data.daily;

        // Ensure that the slice operation is valid by checking arrays exist and have data
        const maxTemps: number[] = daily.temperature_2m_max?.slice(start, end) || [];
        const minTemps: number[] = daily.temperature_2m_min?.slice(start, end) || [];
        const windSpeeds: number[] = daily.wind_speed_10m_mean?.slice(start, end) || [];
        const humidities: number[] = daily.relative_humidity_2m_mean?.slice(start, end) || [];

        if (maxTemps.length === 0 || minTemps.length === 0 || windSpeeds.length === 0 || humidities.length === 0) {
            console.error("One or more weather data arrays are empty after slicing.");
            return null; // Handle empty or missing arrays
        }

        const QMaxTemperature = maxTemps.reduce((a: number, b: number) => a + b, 0) / maxTemps.length || 0;
        const QMinTemperature = minTemps.reduce((a: number, b: number) => a + b, 0) / minTemps.length || 0;
        const QWindSpeed = windSpeeds.reduce((a: number, b: number) => a + b, 0) / windSpeeds.length || 0;
        const QHumidity = humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length || 0;

        const elevation = data.elevation || 0; // Provide a default value if elevation is undefined

        return { QMaxTemperature, QMinTemperature, QWindSpeed, QHumidity, elevation };
    } catch (error) {
        console.error("Error in getQuarterMeans: ", error);
        return null;
    }
}

const getWeatherInfo = async (latitude: number, longitude: number) => {
    const weatherData = await getWeatherForecastByCoords(latitude, longitude);
    console.log("Get the openmeteo data", weatherData);
    return weatherData;
};

const scoreModel = async () => {
    console.log("Scoring model");
    const tokenResponse = await fetch("https://iam.cloud.ibm.com/identity/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "urn:ibm:params:oauth:grant-type:apikey",
            apikey: Key,
        }),
    });

    const jsonResp = await tokenResponse.json();
    console.log("Token response", jsonResp);
    const { access_token: mltoken } = jsonResp;

    const payload_scoring = {
        input_data: [
            {
                fields: [
                    "Q1(Max_Temperature)",
                    "Q1(Min_Temperature)",
                    "Q1(Wind_Speed)",
                    "Q1(Humidity)",
                    "Q2(Max_Temperature)",
                    "Q2(Min_Temperature)",
                    "Q2(Wind_Speed)",
                    "Q2(Humidity)",
                    "Q3(Max_Temperature)",
                    "Q3(Min_Temperature)",
                    "Q3(Wind_Speed)",
                    "Q3(Humidity)",
                    "Q4(Max_Temperature)",
                    "Q4(Min_Temperature)",
                    "Q4(Wind_Speed)",
                    "Q4(Humidity)",
                    "Longitude",
                    "Latitude",
                    "Elevation",
                    "Slope",
                ],
                values: [
                    -242.2438171, -448.810614, 2.871808132, 0.005923631, 
                    -516.7916646, -84.14896444, 2.985443433, 0.005540452, 
                    29.50833537, -262.5931315, 2.47288998, 0.006444937, 
                    -95.20916138, -131.0342194, 2.774173856, 0.005468412, 
                    -119.9831461, 36.33636364, 74, 0.068226084,
                ],
            },
        ],
    };

    const response = await fetch(
        "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/c85506fd-4424-4afb-9684-2e75cfd7115d/predictions?version=2021-05-01",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${mltoken}`,
            },
            body: JSON.stringify(payload_scoring),
        }
    );

    const predictions = await response.json();
    console.log("The predictions are here", predictions);
    return JSON.stringify(predictions);
};
