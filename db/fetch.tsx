import * as SQLite from "expo-sqlite";
import * as SecureStore from "expo-secure-store";
import setupDatabase from "./dbSetup";

/**
 * Represents user data structure.
 */
interface userData {
	Email: string;
	Location: string;
	Name: string;
	id: number;
}

function calculateCartesianCoordinates(lat: number, lon: number) {
	const R = 6371; // Radius of the Earth in kilometers
	const latRad = lat * (Math.PI / 180);
	const lonRad = lon * (Math.PI / 180);

	const x = R * Math.cos(latRad) * Math.cos(lonRad);
	const y = R * Math.cos(latRad) * Math.sin(lonRad);
	const z = R * Math.sin(latRad);

	return { x, y, z };
}


/**
 * Fetches all location data from the database.
 *
 * @returns A promise that resolves to an array of location data or logs an error if the fetch fails.
 */
async function fetchLocationData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM locationData");
		console.log("All location data:", results);
	} catch (error) {
		console.error("Error retrieving location data:", error);
	}
}

/**
 * Fetches all user data from the database.
 *
 * @returns A promise that resolves to an array of user data objects or logs an error if the fetch fails.
 */
async function fetchUserData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM userData");
		return results as Array<object>;
	} catch (error) {
		console.error("Error retrieving data:", error);
	}
}

/**
 * Fetches all farm data from the database.
 *
 * @returns A promise that resolves to an array of farm data or logs an error if the fetch fails.
 */
async function fetchFarmData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM farmData");
		console.log("All data:", results);
	} catch (error) {
		console.error("Error retrieving data:", error);
	}
}

/**
 * Fetches user data for a given email from the database.
 *
 * @param Email - The email address of the user to fetch data for.
 * @returns A promise that resolves to the user's data object or null if not found.
 * @throws Will throw an error if the email is not provided.
 */
async function fetchUserDataByEmail(Email: string): Promise<object | null> {
	if (!Email) {
		throw new Error("Email must be provided.");
	}

	const db = await setupDatabase();

	try {
		const results: any = await db.getAllAsync("SELECT * FROM userData WHERE Email = ?", [Email]);
		console.log("User data:", results);

		if (results.length > 0) {
			return results[0];
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}

/**
 * Fetches all user data from the database.
 *
 * @returns A promise that resolves to an array of user data objects.
 */
async function fetchAllUserData(): Promise<Array<object>> {
	const db = await setupDatabase();
	console.log("db", db);
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
 * Fetches all data cached
 * 
 * @returns A promise that resolves to an array of data cache objects.
 */
async function fetchAllDataCache(): Promise<Array<object>> {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM dataCache");
		return results as Array<object>;
	} catch (error) {
		console.error("Error fetching data cache:", error);
		return [];
	}
}

/**
 * Checks if data is already cached in the database and returns the record ID if found.
 * 
 * @param userId - The ID of the user.
 * @param type - The type of data.
 * @param subject - Subject of the prediction (e.g., crop name). Can be null.
 * @param version - Version of the data.
 * @param activeRadius - Radius within which the data is considered active (default is 1000 meters).
 * @param longitude - Longitude of the location.
 * @param latitude - Latitude of the location.
 * 
 * @returns A promise that resolves to the ID of the cached record if found, or null if not found.
 * @throws An error if required parameters are missing.
 */
async function isDataCached(
  userId: number,
  type: string,
  subject: string | null,
  version: number,
  longitude: string,
  latitude: string,
  activeRadius: number = 1000
): Promise<number | null> {
  // Validate required parameters
  if (!userId) throw new Error("Data cache validation error: userId is not provided");
  if (!type) throw new Error("Data cache validation error: type is not provided");
  if (!version) throw new Error("Data cache validation error: version is not provided");
  if (!longitude) throw new Error("Data cache validation error: longitude is not provided");
  if (!latitude) throw new Error("Data cache validation error: latitude is not provided");

  // Setup database connection
  const db = await setupDatabase();
  
  // Convert latitude/longitude to Cartesian coordinates
  const { x, y, z } = calculateCartesianCoordinates(Number(longitude), Number(latitude));

  try {
    // Check for cached data within the specified radius
    const results = await db.getAllAsync(
      `SELECT id FROM dataCache
       WHERE userId = ?
       AND type = ?
       AND (subject IS NULL OR subject = ?)
       AND version = ?
       AND ((x - ?) * (x - ?) + (y - ?) * (y - ?) + (z - ?) * (z - ?) <= (? * ?))`,
      [userId, type, subject, version, x, x, y, y, z, z, activeRadius, activeRadius]
    );

    // Return the ID of the first found record, or null if none found
	return (results as Array<{ id: number }>).length > 0 ? (results as Array<{ id: number }>)[0].id : null;
  } catch (error) {
    console.error("Error checking data cache:", error);
    throw error;
  }
}


/**
 * Fetches the cached LLM response from the database based on the record ID.
 * 
 * @param id - The ID of the cached record.
 * @returns A promise that resolves to the cached LLM response (data column) as a string.
 * @throws An error if the record is not found or if there's a database error.
 */
async function fetchCachedLlmResponse(id: number): Promise<string | null> {
  if (!id) {
    throw new Error("Fetch error: ID is not provided");
  }

  const db = await setupDatabase();

  try {
    // Fetch the cached data from the dataCache table by ID
    const result = await db.getAllAsync("SELECT data FROM dataCache WHERE id = ?", [id]);

    // If the record exists, return the data column value, otherwise return null
    return result.length > 0 ? (result as Array<{ data: string }>)[0].data : null;	
  } catch (error) {
    console.error("Error fetching cached LLM response:", error);
    throw new Error(`Failed to fetch LLM response: ${error.message}`);
  }
}




/**
 * Checks if the given email is already taken by any user in the database.
 *
 * @param email - The email address to check.
 * @returns A promise that resolves to a boolean indicating whether the email is taken.
 * @throws Will throw an error if the email is not provided or if there is an issue querying the database.
 */
async function isEmailTaken(email: string): Promise<boolean> {
	if (!email) {
		throw new Error("Email must be provided.");
	}

	const db = await setupDatabase();

	try {
		const users = await db.getAllAsync("SELECT * FROM userData");
		const isTaken = users.some((user: any) => user.Email === email);
		return isTaken;
	} catch (error) {
		console.error("Error checking if email is taken:", error);
		throw error;
	}
}

/**
 * Fetches the current user's data from the database based on the email stored in secure storage.
 *
 * @returns A promise that resolves to the user's data object or null if not found.
 * @throws Will log an error if there is an issue retrieving the user's email or querying the database.
 */
async function fetchCurrentUserData(): Promise<object | null> {
	console.log("fetchCurrentUserData");
	const getEmail = async () => {
		try {
			const email = await SecureStore.getItemAsync("userEmail");
			return email;
		} catch (error) {
			console.error("Error getting user email:", error);
			return null;
		}
	};

	try {
		const email = await getEmail();

		if (!email) {
			console.error("No user is logged in.");
			return null;
		}

		const db = await setupDatabase();
		const results: any = await db.getAllAsync("SELECT * FROM userData WHERE Email = ?", [email]);

		if (results.length > 0) {
			const data = results[0] as userData;
			const dataObj = {
				name: data.Name,
				location: data.Location,
				email: data.Email,
				id: data.id,
			};
			return dataObj;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error fetching current user data:", error);
		return null;
	}
}

/**
 * Fetches all booked seeds for a given user ID.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of booked seed objects.
 * @throws Will throw an error if the user ID is not provided or if there is an issue querying the database.
 */
async function fetchBookedSeedsForUser(userId: number): Promise<Array<object>> {
	if (!userId) {
		throw new Error("User ID must be provided.");
	}

	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM bookedSeeds WHERE userId = ?", [userId]);

		console.log("Booked seeds fetched successfully:", results);
		return (results as Array<object>) || [];
	} catch (error) {
		console.error("Error fetching booked seeds:", error);
		throw error;
	}
}

/**
 * Checks if a particular seed is booked by the user.
 *
 * @param userId - The ID of the user.
 * @param cropName - The name of the crop/seed.
 * @returns A promise that resolves to a boolean indicating if the seed is booked by the user.
 * @throws Will throw an error if the user ID or crop name is not provided or if there is an issue querying the database.
 */
async function isSeedBookedByUser(userId: number, cropName: string): Promise<boolean> {
	if (!userId || !cropName) {
		throw new Error("User ID and crop name must be provided.");
	}

	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM bookedSeeds WHERE userId = ? AND SeedName = ?", [userId, cropName]);

		return results.length > 0;
	} catch (error) {
		console.error("Error checking booked seed:", error);
		throw error;
	}
}

/**
 * Fetches all growing crops for a given user ID.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of growing crop objects.
 * @throws Will throw an error if the user ID is not provided or if there is an issue querying the database.
 */
async function fetchGrowingCropsForUser(userId: number): Promise<Array<object>> {
	if (!userId) {
		throw new Error("User ID must be provided.");
	}

	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM growingCrop WHERE userId = ?", [userId]);
		console.log("Grown crops fetched successfully:", results);
		return (results as Array<object>) || [];
	} catch (error) {
		console.error("Error fetching grown crops:", error);
		throw error;
	}
}

/**
 * Checks if a particular crop is currently grown by the user.
 *
 * @param userId - The ID of the user.
 * @param cropName - The name of the crop.
 * @returns A promise that resolves to a boolean indicating if the crop is grown by the user.
 * @throws Will throw an error if the user ID or crop name is not provided or if there is an issue querying the database.
 */
async function isCropGrowByUser(userId: number, cropName: string): Promise<boolean> {
	if (!userId || !cropName) {
		throw new Error("User ID and crop name must be provided.");
	}

	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM growingCrop WHERE userId = ? AND cropName = ?", [userId, cropName]);
		return results.length > 0;
	} catch (error) {
		console.error("Error checking grown crop:", error);
		throw error;
	}
}

export {
	fetchLocationData,
	fetchBookedSeedsForUser,
	fetchGrowingCropsForUser,
	fetchCachedLlmResponse,
	fetchAllUserData,
	fetchCurrentUserData,
	fetchUserData,
	fetchFarmData,
	fetchUserDataByEmail,
	isSeedBookedByUser,
	isCropGrowByUser,
	isDataCached,
	fetchAllDataCache,
};
