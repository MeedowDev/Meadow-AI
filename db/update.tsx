import * as SQLite from "expo-sqlite";

async function addDataToDB() {
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const result = await db.runAsync(
			"INSERT INTO locationData (Longitude, Latitude, Date, ClimatePrediction, CropPrediction) VALUES (?, ?, ?, ?, ?)",
			["longitudeValue", "latitudeValue", "dateValue", "climatePredictionValue", "cropPredictionValue"]
		);

		console.log("Data added successfully!");
	} catch (error) {
		console.error("Error adding data:", error);
	}
}

async function getAllData() {
    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        const results = await db.getAllAsync("SELECT * FROM locationData");

        console.log("All data:", results);
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
}

export { addDataToDB, getAllData };