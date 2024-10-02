import * as SQLite from "expo-sqlite";

async function setupDatabase() {

	const checkListMap: Map<string, boolean> = new Map([
		["locationData", false],
		["userData", false],
		["bookedSeeds", false],
		["growingCrop", false],
	]);

	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		// Run table creation concurrently
		await Promise.all([
			// Create locationData table
			db
				.execAsync(
					`
                CREATE TABLE IF NOT EXISTS locationData (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Longitude TEXT NOT NULL,
                    Latitude TEXT NOT NULL,
                    Date TEXT NOT NULL,
                    ClimatePrediction TEXT NOT NULL,
                    CropPrediction TEXT NOT NULL
                );
            `
				)
				.then(() => checkListMap.set("locationData", true)),

			// Create userData table
			db
				.execAsync(
					`
                CREATE TABLE IF NOT EXISTS userData (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Name TEXT NOT NULL,
                    Email TEXT NOT NULL,
                    Location TEXT NOT NULL
                );
            `
				)
				.then(() => checkListMap.set("userData", true)),

			// Create bookedSeeds table
			db
				.execAsync(
					`
                CREATE TABLE IF NOT EXISTS bookedSeeds (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    SeedName TEXT NOT NULL,
                    userId INTEGER,
                    FOREIGN KEY (userId) REFERENCES userData(id) ON DELETE CASCADE
                );
            `
				)
				.then(() => checkListMap.set("bookedSeeds", true)),

			// Create growingCrop table
			db
				.execAsync(
					`
                CREATE TABLE IF NOT EXISTS growingCrop (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    cropName TEXT NOT NULL,
                    userId INTEGER,
                    FOREIGN KEY (userId) REFERENCES userData(id) ON DELETE CASCADE
                );
            `
				)
				.then(() => checkListMap.set("growingCrop", true)),
		]);

		console.log("All tables successfully created!");
	} catch (error) {
		console.error("Error creating tables:", error);
		console.log("The following tables could not be created:");
		for (const [key, value] of checkListMap) {
			if (!value) {
				console.log(key);
			}
		}
	}
}

export default setupDatabase;
