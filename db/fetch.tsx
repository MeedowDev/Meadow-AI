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
 * Checks if an email is already associated with another user in the database.
 *
 * @param {string} email - The email to check for existence in the user table.
 * @returns {boolean} - Returns true if the email is already taken, false otherwise.
 *
 * @throws {Error} If the database operation fails.
 */
async function isEmailTaken(email: string): Promise<boolean> {
    // Preconditions
    if (!email) {
        throw new Error("Email must be provided.");
    }

    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        // Fetch all user data
        const users = await db.getAllAsync("SELECT * FROM userData");

        // Check if any user has the provided email
		const isTaken = users.some((user: any) => user.Email === email);

        return isTaken;
    } catch (error) {
        console.error("Error checking if email is taken:", error);
        throw error; // Re-throw the error for further handling
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

/**
 * Fetches all booked seeds for the currently logged-in user.
 *
 * @param {number} userId - The ID of the user to fetch booked seeds for.
 * @returns {Array<object>} - An array of booked seeds.
 *
 * @throws {Error} If the database operation fails.
 */
async function fetchBookedSeedsForUser(userId: number): Promise<Array<object>> {
    // Preconditions
    if (!userId) {
        throw new Error("User ID must be provided.");
    }

	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		// Fetch booked seeds where the userId matches the current user
		const results = await db.getAllAsync(
			"SELECT * FROM bookedSeeds WHERE userId = ?",
			[userId]
		);

		console.log("Booked seeds fetched successfully:", results);
		return results as Array<object> || []; // Return results or an empty array
	} catch (error) {
		console.error("Error fetching booked seeds:", error);
		throw error; // Re-throw the error for further handling
	}
}

/**
 * Checks if a specific seed is already booked by the user.
 *
 * @param {number} userId - The ID of the user to check against.
 * @param {string} cropName - The name of the seed (crop) to check.
 * @returns {Promise<boolean>} - Returns true if the seed is booked, otherwise false.
 *
 * @throws {Error} If the database operation fails.
 */
async function isSeedBookedByUser(userId: number, cropName: string): Promise<boolean> {
    // Preconditions
    if (!userId || !cropName) {
        throw new Error("User ID and crop name must be provided.");
    }

    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        // Query the booked seeds for the specified user and crop name
        const results = await db.getAllAsync(
            "SELECT * FROM bookedSeeds WHERE userId = ? AND SeedName = ?",
            [userId, cropName]
        );

        // Return true if there are any results (seed is booked), otherwise false
        return results.length > 0;
    } catch (error) {
        console.error("Error checking booked seed:", error);
        throw error; // Re-throw the error for further handling
    }
}



/**
 * Fetches all crops grown by the currently logged-in user.
 *
 * @param {number} userId - The ID of the user to fetch booked seeds for.
 * @returns {Array<object>} - An array of crops grown by the user.
 *
 * @throws {Error} If the database operation fails.
 */
async function fetchGrowingCropsForUser(userId: number): Promise<Array<object>> {
    // Preconditions
    if (!userId) {
        throw new Error("User ID must be provided.");
    }

	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		// Fetch grown crops where the userId matches the current user
		const results = await db.getAllAsync("SELECT * FROM growingCrop WHERE userId = ?", [userId]);

		console.log("Grown crops fetched successfully:", results);
		return results as Array<object> || []; // Return results or an empty array
	} catch (error) {
		console.error("Error fetching grown crops:", error);
		throw error; // Re-throw the error for further handling
	}
}


/**
 * Checks if a specific crops is already grown by the user.
 *
 * @param {number} userId - The ID of the user to check against.
 * @param {string} cropName - The name of the crop to check.
 * @returns {Promise<boolean>} - Returns true if the seed is booked, otherwise false.
 *
 * @throws {Error} If the database operation fails.
 */
async function isCropGrowByUser(userId: number, cropName: string): Promise<boolean> {
    // Preconditions
    if (!userId || !cropName) {
        throw new Error("User ID and crop name must be provided.");
    }

    const db = await SQLite.openDatabaseAsync("db.db");

    try {
        // Query the booked seeds for the specified user and crop name
        const results = await db.getAllAsync("SELECT * FROM growingCrop WHERE userId = ? AND cropName = ?", [userId, cropName]);

        // Return true if there are any results (seed is booked), otherwise false
        return results.length > 0;
    } catch (error) {
        console.error("Error checking booked seed:", error);
        throw error; // Re-throw the error for further handling
    }
}




export {
	fetchLocationData,
	fetchBookedSeedsForUser,
	fetchGrowingCropsForUser,
	fetchAllUserData,
	fetchCurrentUserData,
	fetchUserData,
	fetchFarmData,
	fetchUserDataByEmail,
	isSeedBookedByUser,
	isCropGrowByUser,
};
