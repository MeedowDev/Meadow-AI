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

		return results as Array<object>;
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

/**
 * Fetches user data from the database for a specific email.
 *
 * @param {string} Email - Email of the user to be fetched.
 *
 * @returns {object | null} - User data if found, otherwise null.
 *
 * @throws {Error} If the database operation fails.
 */
async function fetchUserDataByEmail(Email: string): Promise<object | null> {
	if (!Email) {
		throw new Error("Email must be provided.");
	}

	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const results: any = await db.getAllAsync("SELECT * FROM userData WHERE Email = ?", [Email]);

		// Check if user data exists
		if ((results as any).rows.length > 0) {
			return results.rows.item(0); // Return the first row (user data)
		} else {
			return null; // Return null if no user found
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
}

/**
 * Fetches all user data from the database.
 *
 * @returns {Array<object>} - An array of user data objects.
 *
 * @throws {Error} If the database operation fails.
 */
async function fetchAllUserData(): Promise<Array<object>> {
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const results = await db.getAllAsync("SELECT * FROM userData");

		console.log("All users:", results);

		return results as Array<object>;
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
}

export { fetchLocationData, fetchAllUserData, fetchUserData, fetchFarmData, fetchUserDataByEmail };
