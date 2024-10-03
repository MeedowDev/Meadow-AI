import * as SQLite from "expo-sqlite";

async function checkTableExists() {
	try {
		const db = await SQLite.openDatabaseAsync("db.db");
		console.log("Database opened successfully.");
        console.log("Database:", db);


		try {
			const results = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='userData';");
			console.log("Query executed. Results:", results);
		} catch (error) {
			console.error("Error running query:", error);
		}
	} catch (error) {
		console.error("Error opening database:", error);
	}
}

async function checkUserDataExists() {
	const db = await SQLite.openDatabaseAsync("db.db");
	const results = await db.getAllAsync("SELECT * FROM userData");
	console.log("User data:", results);
}

async function checkLocationDataExists() {
	const db = await SQLite.openDatabaseAsync("db.db");
	const results = await db.getAllAsync("SELECT * FROM locationData");
	console.log("Location data:", results);
}

async function checkBookedSeedsExists() {
	const db = await SQLite.openDatabaseAsync("db.db");
	const results = await db.getAllAsync("SELECT * FROM bookedSeeds");
	console.log("Booked seeds:", results);
}

async function checkGrowingCropExists() {
	const db = await SQLite.openDatabaseAsync("db.db");
	const results = await db.getAllAsync("SELECT * FROM growingCrop");
	console.log("Growing crop:", results);
}

const clearDatabase = async () => {
	const db = await SQLite.openDatabaseAsync("db.db");
	await db.execAsync("DROP TABLE IF EXISTS userData");
	await db.execAsync("CREATE TABLE IF NOT EXISTS userData");
};


export { checkTableExists, checkUserDataExists, checkLocationDataExists, checkBookedSeedsExists, checkGrowingCropExists };
