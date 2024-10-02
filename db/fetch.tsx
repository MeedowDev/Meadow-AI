import * as SQLite from "expo-sqlite";



/**
 * Retrieves all location data from the database.
 * 
 * @postcondition All location data is logged to the console.
 * 
 * @throws {Error} If the database operation fails.
 */
async function fetchLocationData() {
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const results = await db.getAllAsync("SELECT * FROM locationData");
		console.log("All location data:", results);
	} catch (error) {
		console.error("Error retrieving location data:", error);
	}
}


async function fetchUserData() {
    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        const results = await db.getAllAsync("SELECT * FROM userData");

        console.log("All data:", results);
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
}

async function fetchFarmData() {
    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        const results = await db.getAllAsync("SELECT * FROM farmData");

        console.log("All data:", results);
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
}

export { fetchLocationData, fetchUserData, fetchFarmData };