import * as SQLite from "expo-sqlite";

async function setupDatabase() {
	const db = await SQLite.openDatabaseAsync("db.db");

	  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS locationData (

                    id INTEGER PRIMARY KEY AUTOINCREMENT,

                    Longitude TEXT NOT NULL,

                    Latitude TEXT NOT NULL,

                    Date TEXT NOT NULL,

                    ClimatePrediction TEXT NOT NULL,

                    CropPrediction TEXT NOT NULL

                );
    `);
    console.log("Database still looking good")

  } catch (error) {
    console.error("Error creating table:", error);
  }
}


export default setupDatabase;
