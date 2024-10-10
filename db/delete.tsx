import * as SQLite from "expo-sqlite";
import setupDatabase from "./dbSetup";

/**
 * Deletes a user by ID from the userData table.
 *
 * @param {number} userId - The ID of the user to be deleted.
 *
 * @throws {Error} If the userId is not provided or if the deletion fails.
 */
async function deleteUserById(userId: number) {
	if (!userId) {
		throw new Error("User ID must be provided.");
	}

	const db = await setupDatabase();
	try {
		const result = await db.runAsync("DELETE FROM userData WHERE id = ?", [userId]);
		console.log(`User with ID ${userId} deleted successfully!`);
	} catch (error) {
		console.error(`Error deleting user with ID ${userId}:`, error);
		throw new Error("Failed to delete user.");
	}
}
/**
 * Deletes a growing crop by ID from the growingCrop table.
 *
 * @param {number} cropId - The ID of the growing crop to be deleted.
 * @param {number} userId - The ID of the user who owns the crop.
 *
 * @throws {Error} If the cropId or userId is not provided or if the deletion fails.
 */
async function deleteGrowingCropById(cropId: number, userId: number) {
    if (!cropId || !userId) {
        throw new Error("Both Crop ID and User ID must be provided.");
    }

    const db = await setupDatabase();
    try {
        const result = await db.runAsync("DELETE FROM growingCrop WHERE id = ? AND userId = ?", [cropId, userId]);
        if (result.changes === 0) {
            throw new Error(`No crop found with ID ${cropId} for user ID ${userId}.`);
        }
        console.log(`Growing crop with ID ${cropId} deleted successfully!`);
    } catch (error) {
        console.error(`Error deleting growing crop with ID ${cropId}:`, error);
        throw new Error("Failed to delete growing crop.");
    }
}

/**
 * Deletes a booked seed by ID from the bookedSeeds table.
 *
 * @param {number} seedId - The ID of the booked seed to be deleted.
 * @param {number} userId - The ID of the user who owns the seed.
 *
 * @throws {Error} If the seedId or userId is not provided or if the deletion fails.
 */
async function deleteBookedSeedById(seedId: number, userId: number) {
    if (!seedId || !userId) {
        throw new Error("Both Seed ID and User ID must be provided.");
    }

    const db = await setupDatabase();
    try {
        const result = await db.runAsync("DELETE FROM bookedSeeds WHERE id = ? AND userId = ?", [seedId, userId]);
        if (result.changes === 0) {
            throw new Error(`No seed found with ID ${seedId} for user ID ${userId}.`);
        }
        console.log(`Booked seed with ID ${seedId} deleted successfully!`);
    } catch (error) {
        console.error(`Error deleting booked seed with ID ${seedId}:`, error);
        throw new Error("Failed to delete booked seed.");
    }
}

async function deleteLocationDataById(locationId: number) {
	if (!locationId) {
		throw new Error("Location ID must be provided.");
	}

	const db = await setupDatabase();
	try {
		const result = await db.runAsync("DELETE FROM locationData WHERE id = ?", [locationId]);
		console.log(`Location data with ID ${locationId} deleted successfully!`);
	} catch (error) {
		console.error(`Error deleting location data with ID ${locationId}:`, error);
		throw new Error("Failed to delete location data.");
	}
}

export { deleteUserById, deleteBookedSeedById, deleteGrowingCropById, deleteLocationDataById };
