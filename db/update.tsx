import * as SQLite from "expo-sqlite";

/**
 * Inserts location data into the database.
 *
 * @param {string} Longitude - The longitude of the location.
 * @param {string} Latitude - The latitude of the location.
 * @param {string} Date - The date the data was recorded.
 * @param {string} ClimatePrediction - The predicted climate at the location.
 * @param {string} CropPrediction - The predicted crop to grow at the location.
 * 
 * @precondition Longitude and Latitude must be valid strings.
 * @precondition Date must be in the format "YYYY-MM-DD".
 * @postcondition Location data is added to the `locationData` table in the database.
 *
 * @throws {Error} If any precondition is not met, or if the database operation fails.
 */
async function updateLocationData(Longitude: string, Latitude: string, Date: string, ClimatePrediction: string, CropPrediction: string) {
	// Preconditions
	if (!Longitude || !Latitude) {
		throw new Error("Longitude and Latitude must be provided.");
	}
	if (!Date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        console.log("date", Date);
		throw new Error("Date must be in the format YYYY-MM-DD.");
	}
	const db = await SQLite.openDatabaseAsync("db.db");
    console.log("db opened");
	try {
		// Database operation
		const result = await db.runAsync(
			"INSERT INTO locationData (Longitude, Latitude, Date, ClimatePrediction, CropPrediction) VALUES (?, ?, ?, ?, ?)",
			[Longitude, Latitude, Date, ClimatePrediction, CropPrediction]
		);

		// Postcondition: Ensure the result of the operation is as expected
		if (!result) {
			throw new Error("Postcondition failed: Location data was not added.");
		}

		console.log("Location data added successfully!");
	} catch (error) {
		console.error("Error adding location data:", error);
		throw new Error("Failed to add location data.");
	}
}



/**
 * Inserts user data into the database.
 * 
 * @param {string} Name - Name of the user
 * @param {string} Email - Email of the user
 * @param {string} Location - Location of the user
 * 
 * @precondition Name, Email and Location must be valid strings.
 * 
 * @postcondition User data is added to the `userData` table in the database.
 * 
 * @throws {Error} If any precondition is not met, or if the database operation fails.
 */
async function updateUserData(Name: string, Email: string, Location: string) {
    // Preconditions
    if (!Name || !Email || !Location) {
        throw new Error("Name, Email and Location must be provided.");
    }
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const result = await db.runAsync("INSERT INTO userData (Name, Email, Location) VALUES (?, ?, ?)", [Name, Email, Location]);
		console.log("User data added successfully!");
	} catch (error) {
		console.error("Error adding user data:", error);
	}
}

/**
 * 
 * @param SeedName - The seed the user has booked
 * @param userId - The id of the user who booked the seed
 * 
 * @precondition SeedName must be a valid string
 * @precondition userId must be a valid number
 * @postcondition Booked seed is added to the `bookedSeeds` table in the database
 */
async function updateBookedSeeds(SeedName: string, userId: number) {
    if (!SeedName) {
        throw new Error("SeedName must be provided.");
    }
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const result = await db.runAsync("INSERT INTO bookedSeeds (SeedName, userId) VALUES (?, ?)", [SeedName, userId]);
		console.log("Booked seed added successfully!");
	} catch (error) {
		console.error("Error adding booked seed:", error);
	}
}

/**
 * 
 * @param cropName - The crop the user is growing
 * @param userId - The id of the user who is growing the crop
 * 
 * @precondition cropName must be a valid string
 * @precondition userId must be a valid number
 * @postcondition Growing crop is added to the `growingCrop` table in the database
 */
async function updateGrowingCrop(cropName: string, userId: number) {
    if (!cropName) {
        throw new Error("CropName must be provided.");
    }
	const db = await SQLite.openDatabaseAsync("db.db");

	try {
		const result = await db.runAsync("INSERT INTO growingCrop (cropName, userId) VALUES (?, ?)", [cropName, userId]);
		console.log("Growing crop data added successfully!");
	} catch (error) {
		console.error("Error adding growing crop data:", error);
	}
}

// Exporting all functions
export { updateLocationData, updateUserData, updateBookedSeeds, updateGrowingCrop };
