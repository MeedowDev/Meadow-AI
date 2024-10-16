import { isDataCached, fetchCachedLlmResponse } from "../db/fetch";
import promptHandled from "./promptGenerator";
import { updateDataCache } from "../db/update";
import { LocationObject } from "expo-location";
// this create a prompt for the user, calls function scroing the modl and returns the result

export async function fetchLlmData(userId: number, longitude: string, latitude: string, userLocation: LocationObject, type: string, subject: object, version: number) {
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

	const cacheSubject = `${subject.selectedCrop}`;

	const dataCachedId = await isDataCached(userId, type, cacheSubject, version, longitude, latitude);
	console.log("Is data cached values", userId, type, cacheSubject, version, longitude, latitude);
	if (dataCachedId == null) {
		const data = await promptHandled(userLocation, `${subject.selectedCrop}, of variety${subject.cropVariety}`);
		return data;
	}

	//Use id stored in dataCached to fetch the data from the database
	const data = await fetchCachedLlmResponse(dataCachedId);

	//Store the data in the cache so the farmer doesnt have to always be online
	if (data) await storeResponse(userId, type, subject, data, version, longitude, latitude);
	return data;
}


const storeResponse = async (userId: number, type: string, subject: object, response: string, version: number, longitude: string, latitude: string) => {
	const cacheSubject = `${subject.selectedCrop}_${subject.cropVariety}`;

	await updateDataCache( userId, type, "7", longitude, latitude, cacheSubject, response, version);
}