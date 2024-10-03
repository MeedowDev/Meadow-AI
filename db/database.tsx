import * as SQLite from "expo-sqlite";

async function setupDatabase() {
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		await db.execAsync(`
      CREATE TABLE IF NOT EXISTS myTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Longitude TEXT NOT NULL,
        Latitude TEXT NOT NULL,
        Date DATE NOT NULL,
        ClimatePrediction TEXT NOT NULL,
        CropPrediction TEXT NOT NULL,
        age INTEGER
      );
    `);

		console.log("Table created successfully!");
	} catch (error) {
		console.error("Error creating table:", error);
	}
}

setupDatabase();