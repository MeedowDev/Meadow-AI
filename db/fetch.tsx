import * as SQLite from "expo-sqlite";
import * as SecureStore from "expo-secure-store";
import setupDatabase from "./dbSetup";

interface userData {
	Email: string;
	Location: string;
	Name: string;
	id: number;
}

async function fetchLocationData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM locationData");
		console.log("All location data:", results);
	} catch (error) {
		console.error("Error retrieving location data:", error);
	}
}

async function fetchUserData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM userData");
		return results as Array<object>;
	} catch (error) {
		console.error("Error retrieving data:", error);
	}
}

async function fetchFarmData() {
	const db = await setupDatabase();

	try {
		const results = await db.getAllAsync("SELECT * FROM farmData");
		console.log("All data:", results);
	} catch (error) {
		console.error("Error retrieving data:", error);
	}
}

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
 * Fetches the current user's data from the database.
 *
 * This function retrieves the user's email from secure storage and then queries the database
 * to fetch the user's data based on the email. If the user is not logged in or if there is an error
 * during the process, it returns `null`.
 *
 * @returns {Promise<object | null>} A promise that resolves to an object containing the user's data
 * (name, location, email, and id) if the user is found, or `null` if the user is not found or an error occurs.
 *
 * @throws Will log an error message if there is an issue retrieving the email or querying the database.
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
	fetchAllUserData,
	fetchCurrentUserData,
	fetchUserData,
	fetchFarmData,
	fetchUserDataByEmail,
	isSeedBookedByUser,
	isCropGrowByUser,
};
