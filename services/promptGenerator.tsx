import { LocationObject } from "expo-location";
import { generateText } from "../api/languageModelAPI";

// Function for getting weather data from OpenMeteoAPI
export async function getWeatherForecast(location: LocationObject) {
	console.log("Fetching weather for location:", location);
	const { latitude, longitude } = location.coords;
	const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean&timezone=auto`;

	try {
		const response = await fetch(apiUrl);
		//console.log("Respose", response)
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

//calculating the quarterly means of the most important conditions
function getQuarterMeans(data: any, start: number, end: number) {
	const QMaxTemperature = data.daily.temperature_2m_max.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);
	const QMinTemperature = data.daily.temperature_2m_min.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);
	const QHumidity = data.daily.relative_humidity_2m_mean.slice(start, end + 1).reduce((a: number, b: number) => a + b) / (end - start + 1);

	return { QMaxTemperature, QMinTemperature, QHumidity };
}

// Function to handle weather data and llm comparison
export default async function promptHandled(userLocation: any | null, crop: string) {
	if (!userLocation) {
		console.error("Location is not defined");
		return; // Exit the function if location is not available
	}
	try {
		//my now currect weather data is here
		if (!userLocation) return "Location not available";
		const weatherData = await getWeatherForecast(userLocation);
		const length = weatherData.daily.time.length;
		const quarter = Math.floor(length / 4);

		// Initialize accumulators for overall weather conditions
		let totalMaxTemp = 0;
		let totalMinTemp = 0;
		let totalHumidity = 0;

		// Collect quarterly data
		let quarterlyData = [];

		//our 4 quarters
		for (let i = 0; i < 4; i++) {
			const quarterData = getQuarterMeans(weatherData, quarter * i, quarter * (i + 1) - 1);
			quarterlyData.push(quarterData);
			totalMaxTemp += quarterData.QMaxTemperature;
			totalMinTemp += quarterData.QMinTemperature;
			totalHumidity += quarterData.QHumidity;
		}

		// Calculate the overall means across the four quarters
		const overallMaxTemp = totalMaxTemp / 4;
		const overallMinTemp = totalMinTemp / 4;
		const overallHumidity = totalHumidity / 4;

		const overallConditions = {
			QMaxTemperature: overallMaxTemp,
			QMinTemperature: overallMinTemp,
			QHumidity: overallHumidity,
			quarterlyData, // Include quarterly data for LLM input
		};

		// Prepare input for LLM
		//what will be there for the llm response
		const input = `
            I am giving this prompt on behalf of a farmer. They live in a region with the overall weather conditions:
            - QMaxTemperature: ${overallConditions.QMaxTemperature.toFixed(2)}
            - QMinTemperature: ${overallConditions.QMinTemperature.toFixed(2)}
            - QHumidity: ${overallConditions.QHumidity.toFixed(2)}
            Qmax, Qmin, Qhumidity are the averages 4 upcoming quaters for the next 6 months
            Please provide advice on whether these conditions are suitable for growing ${crop} and highlight any concerns specific to each quarter's data: 
            ${quarterlyData
			.map(
				(data, index) => `
                Quarter ${index + 1} - Max Temp: ${data.QMaxTemperature.toFixed(2)}, Min Temp: ${data.QMinTemperature.toFixed(2)}, Humidity: ${data.QHumidity.toFixed(2)}
            `
			)
			.join("")}
        `;

		// Generate the response text using LLM

		console.log("Input to LLM:", input);

		//TODO: Hello reviewer, please uncomment the following line to get the actual response from the LLM
		//const llmResponse = await generateText(input);

		const llmResponse = "This is a dummy response from the LLM due to cost implications of using the WatsonX LLM and react refreshes everything on modifying code. Please uncomment the actual LLM code to get the real response and remember to comment this line out. Services/promptGenerator.tsx line 158";
		return llmResponse; // Return the LLM's advice
	} catch (error) {
		console.error("Error in handling weather data or comparison:", error);
		throw error;
	}
}
