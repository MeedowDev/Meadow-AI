// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateUserData } from "../db/update";
import { fetchUserDataByEmail, fetchBookedSeedsForUser, fetchGrowingCropsForUser } from "../db/fetch";
import { deleteGrowingCropById, deleteBookedSeedById } from "../db/delete";
import * as SecureStore from "expo-secure-store";
// Define a User Data Type
interface UserData {
	Email: string;
	Name: string;
	Location: string;
	id: number;
}

// Define AuthContextType
interface AuthContextType {
	isLoggedIn: boolean;
	user: UserData | null;
	bookedSeeds: object[] | null;
	crops: object[] | null;
	logout: () => Promise<void>;
	signup: (Name: string, Email: string, Location: string) => Promise<void>;
	signin: (Email: string) => Promise<boolean>;
	forceLogin: () => Promise<void>;
	deleteCrop: (cropId: number, userId: number) => Promise<void>;
	deleteSeed: (seedId: number, userId: number) => Promise<void>;
	updateBookedSeedsContext: () => Promise<void>;
	updateGrowingCropsContext: () => Promise<void>;
	checkLoginStatus: () => Promise<void>;
}

// Update AuthContext to include user data
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<UserData | null>(null); // State to hold the user data
	const [bookedSeeds, setBookedSeeds] = useState<object[] | null>(null);
	const [crops, setCrops] = useState<object[] | null>(null);

	const checkLoginStatus = async () => {
		const sessionId = await SecureStore.getItemAsync("userSession");
		setIsLoggedIn(!!sessionId); // Set isLoggedIn based on whether sessionId exists
	};

	const forceLogin = async () => {
		console.warn("Forced login, user context may be lost!");
		setIsLoggedIn(true);
	}

	const updateBookedSeedsContext = async () => {
		if (user) {
			const seeds = await fetchBookedSeedsForUser(user.id);
			setBookedSeeds(seeds);
		} else {
			console.error("User data not found!");
		}
	};
	const updateGrowingCropsContext = async () => {
		console.log("Updating growing crops context");
		if (user) {
			const allCrops = await fetchGrowingCropsForUser(user.id);
			setCrops(allCrops);
		} else {
			console.error("User data not found!");
		}
	};

	const clearSession = async () => {
		await SecureStore.deleteItemAsync("userSession");
		await SecureStore.deleteItemAsync("userEmail");
		setIsLoggedIn(false);
		setUser(null); // Clear user data on logout
	};

	const startSession = async (email: string) => {
		email = email.trim().toLowerCase(); 
		const sessionId = generateSessionId();
		await SecureStore.setItemAsync("userSession", sessionId);
		await SecureStore.setItemAsync("userEmail", email);
	};

	const fetchAndSetUser = async (email: string) => {
		email = email.trim().toLowerCase(); 
		const userData = await fetchUserDataByEmail(email);
		if (userData && typeof userData === "object" && "Email" in userData && "Name" in userData && "Location" in userData && "id" in userData) {
			console.log("Fetched and set user data:", userData);
			setUser(userData as UserData); // Store user data in state
		}
	};

	const deleteCrop = async (cropId: number, userId: number) => {
		if (!cropId || !userId) {
			throw new Error("Both Crop ID and User ID must be provided.");
		}

		try {
			await deleteGrowingCropById(cropId, userId);
			await updateGrowingCropsContext();
			console.log("Crop deleted successfully!");
		} catch (error) {
			console.error("Error deleting crop:", error);
		}
	};
	const deleteSeed = async (seedId: number, userId: number) => {
		if (!seedId || !userId) {
			throw new Error("Both Seed ID and User ID must be provided.");
		}

		try {
			await deleteBookedSeedById(seedId, userId);
			await updateBookedSeedsContext();
			console.log("Seed deleted successfully!");
		} catch (error) {
			console.error("Error deleting seed:", error);
		}
	}

	const attemptResumeSession = async () => {
		try {
			const email = await SecureStore.getItemAsync("userEmail");
			if (email) {
				console.log("Attempting to resume session for:", email);
				const userData = await fetchUserDataByEmail(email);
				if (userData) {
					const seeds = await fetchBookedSeedsForUser((userData as UserData).id);
					const crops = await fetchGrowingCropsForUser((userData as UserData).id);

					setUser(userData as UserData);
					setBookedSeeds(seeds);
					setCrops(crops);
					setIsLoggedIn(true);
					console.log("Session resumed successfully!");
				} else {
					console.error("No user found for stored email.");
					setIsLoggedIn(false);
				}
			} else {
				console.log("No saved session found.");
			}
		} catch (error) {
			console.error("Error resuming session:", error);
		}
	};
	useEffect(() => {
		attemptResumeSession(); // Check and restore session on app launch
	}, []);


	const signin = async (Email: string): Promise<boolean> => {
		Email = Email.trim().toLowerCase(); 
		try {
			const userData = await fetchUserDataByEmail(Email); // Fetch user data directly

			if (!userData) {
				console.warn("Signin failed: User not found!");
				return false; // Stop further execution if user doesn't exist
			}
			const seeds = await fetchBookedSeedsForUser((userData as UserData).id); // Fetch booked seeds for the user
			const crops = await fetchGrowingCropsForUser((userData as UserData).id); // Fetch crops for the user
			console.log("Fetched booked seeds:", seeds);
			setUser(userData as UserData); // Set the fetched user data to state
			await startSession(Email);
			setBookedSeeds(seeds);
			setCrops(crops);
			setIsLoggedIn(true);

			console.log("Signin successful!");
			return true;
		} catch (error) {
			console.error("Signin failed:", error);
			return false;
		}
	};

	const signup = async (Name: string, Email: string, Location: string) => {
		Email = Email.trim().toLowerCase();
		try {
			await updateUserData(Name, Email, Location);
			await startSession(Email);
			await fetchAndSetUser(Email); // Fetch user data after signup
			setIsLoggedIn(true);
			console.log("Signup successful!");
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	const logout = async () => {
		try {
			await clearSession(); // Clear session data
			setIsLoggedIn(false);
			setUser(null); // Clear user data on logout
			console.log("User logged out successfully.");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	useEffect(() => {
		checkLoginStatus(); // Check login status on initial render
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				logout,
				signup,
				signin,
				forceLogin,
				checkLoginStatus,
				bookedSeeds,
				crops,
				deleteCrop,
				deleteSeed,
				updateBookedSeedsContext,
				updateGrowingCropsContext,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// Function to generate a session ID
function generateSessionId() {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
