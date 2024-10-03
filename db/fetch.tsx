import * as SQLite from "expo-sqlite";
import * as SecureStore from "expo-secure-store";

interface userData {
	Email: string;
	Location: string;
	Name: string;
	id: number;
}
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

		console.log("User data:", results);

		if (results.length > 0) {
			return results[0]; // Return the first user found
		} else {
			return null; // Return null if no user found
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
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

/**
 * Fetches the current user's data from the database based on their email.
 *
 * This function retrieves the email of the currently logged-in user
 * and uses it to fetch their corresponding data from the `userData` table.
 *
 * @returns {Promise<object | null>} - A promise that resolves to the user data if found,
 *                                      or null if no user is logged in or if no data is found.
 *
 * @throws {Error} If there is an error during the database operation.
 */
async function fetchCurrentUserData(): Promise<object | null> {
    console.log("fetchCurrentUserData");
    const getEmail = async () => {
        try {
            const email = await SecureStore.getItemAsync("userEmail");
            // const sessionID = await SecureStore.getItemAsync("userSession");
            // console.log(email);
            // console.log("SEssion ID", sessionID);
            return email;
        } catch (error) {
            console.error("Error getting user email:", error);
            return null;
        }
    };

	try {
		const email = await getEmail(); // Get the email of the currently logged-in user

		if (!email) {
			console.error("No user is logged in.");
			return null; // Return null if no user is logged in
		}

		const db = await SQLite.openDatabaseAsync("db.db");

		// Fetch user data by email
		const results: any = await db.getAllAsync("SELECT * FROM userData WHERE Email = ?", [email]);

		if (results.length > 0) {
            const data = results[0] as userData
            const dataObj = {
                name: data.Name,
                location: data.Location,
                email: data.Email,
                id: data.id
            }
			return dataObj; // Return user data
		} else {
			return null; // No user found
		}
	} catch (error) {
		console.error("Error fetching current user data:", error);
		return null; // Return null in case of error
	}
}




export { fetchLocationData, fetchAllUserData, fetchCurrentUserData, fetchUserData, fetchFarmData, fetchUserDataByEmail };
