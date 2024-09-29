import { useContext, useEffect, useState } from "react";
import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import { LocationContext } from "../context/locationContext";

const Key = "OnRFCsfVfzrUsXZiItV1lkPFbDPbJbqJ4UfSWFpYj0fL";

export default function handleScoreModel(latitude: number, longitude: number) {
	const rawWeatherData = getWeatherInfo(latitude, longitude);
	var result: number[] = [];

	//? 6 month growth period
	function getQuaterMeans(data: any, start: number, end: number) {
		const QMaxTemperature = data.daily.temperature_2m_max.slice(start, end).reduce((a: number, b: number) => a + b) / (end - start);
		const QMinTemperature = data.daily.temperature_2m_min.slice(start, end).reduce((a: number, b: number) => a + b) / (end - start);
		const QWindSpeed = data.daily.wind_speed_10m_mean.slice(start, end).reduce((a: number, b: number) => a + b) / (end - start);
		const QHumidity = data.daily.relative_humidity_2m_mean.slice(start, end).reduce((a: number, b: number) => a + b) / (end - start);
		result.push(QMaxTemperature, QMinTemperature, QWindSpeed, QHumidity);
	}

	try {
		console.log("Scoring model");
		rawWeatherData.then((data) => {
			const lenght = data.daily.time.length;
			const quater = Math.floor(lenght / 4);
			for (let i = 0; i < 4; i++) {
				getQuaterMeans(data, quater * i, quater * i + quater - 1);
			}
			result.push(data.elevation);
			console.log("Result", result);
		});

		scoreModel(result);
	} catch (error) {
		console.error("Error scoring model: ", error);
	}
}

const getWeatherInfo = async (latitude: number, longitude: number) => {
	const weatherData = await getWeatherForecastByCoords(latitude, longitude);
	return weatherData;
};

const scoreModel = async (data: number[]) => {
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
					"Elevation",
				],
				values: data,
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
