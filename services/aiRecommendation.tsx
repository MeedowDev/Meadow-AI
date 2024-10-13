import { isDataCached, fetchCachedLlmResponse } from "../db/fetch";

export async function fetchLlmData(userId: number, longitude: string, latitude: string, type: string, subject: string, version: number) {
	//const dataCachedId = 1;
	var validityPeriod;
	switch (type) {
		case "HomeAdvisor":
			validityPeriod = "1";
			break;
		case "CropAdvisor":
			validityPeriod = "7";
			break;
		case "SpecificsAdvisor":
			validityPeriod = "7";
			break;
	}

	const around500mLongitude = "37.014472";
	const around500mLatitude = "-1.099536";

	const around1500mLongitude = "47.014472";
	const around1500mLatitude = "-2.090543";

	const dataCachedId = await isDataCached(userId, type, subject, version, longitude, latitude);

	if (dataCachedId == null) {
		return "Data not cached, score model and return data";
	}
	
	//Use id stored in dataCached to fetch the data from the database
	const data = await fetchCachedLlmResponse(dataCachedId)
	console.log("Data fetched from cache ", data);
	return data;
}
