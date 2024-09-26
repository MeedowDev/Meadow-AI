import { useContext, useEffect } from "react";
import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import { LocationContext } from "../context/locationContext";

const Key = "OnRFCsfVfzrUsXZiItV1lkPFbDPbJbqJ4UfSWFpYj0fL";

export default function handleScoreModel(latitude: number, longitude: number) {
	getWeatherForecastByCoords(latitude, longitude).then((data) => {
		console.log("Weather data: ", data);
	});

	try {
		scoreModel();
	} catch (error) {
		console.error("Error scoring model: ", error);
	}
}

const getWeatherInfo = async (latitude: number, longitude: number) => {
	const weatherData = await getWeatherForecastByCoords(latitude, longitude);
	return weatherData;
}

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
	console.log("token response", jsonResp);
	const { access_token: mltoken } = await jsonResp;

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
					-242.2438171, -448.810614, 2.871808132, 0.005923631, -516.7916646, -84.14896444, 2.985443433, 0.005540452, 29.50833537,
					-262.5931315, 2.47288998, 0.006444937, -95.20916138, -131.0342194, 2.774173856, 0.005468412, -119.9831461, 36.33636364,
					74, 0.068226084,
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
	console.log(predictions);
	return JSON.stringify(predictions);
};