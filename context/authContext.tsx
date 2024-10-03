// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateUserData } from "../db/update";
import { fetchUserDataByEmail } from "../db/fetch";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
	isLoggedIn: boolean;
	checkLoginStatus: () => Promise<void>;
	login: (Name: string, Email: string, Location: string) => Promise<void>;
	logout: () => Promise<void>;
	signin: (Email: string) => Promise<void>;
	signup: (Name: string, Email: string, Location: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkLoginStatus = async () => {
		const sessionId = await SecureStore.getItemAsync("userSession");
		setIsLoggedIn(!!sessionId); // Set isLoggedIn based on whether sessionId exists
	};

	const login = async (Name: string, Email: string, Location: string) => {
		console.warn("Login method is being phased out. Use signin or signup instead.");
		try {
			// Call the function to update user data
			await updateUserData(Name, Email, Location);

			// Generate a session ID and store it
			const sessionId = generateSessionId(); // Implement this function to create a unique session ID
			await SecureStore.setItemAsync("userSession", sessionId); // Save session ID in SecureStore

			setIsLoggedIn(true); // Update the logged-in status
		} catch (error) {
			console.error("Login failed:", error);
			throw error; // Re-throw the error for further handling if needed
		}
	};

	const signin = async (Email: string) => {
		try {
			// Fetch the user data by email
			const userData = await fetchUserDataByEmail(Email);

			if (userData) {
				// If user exists, generate a session ID and store it
				const sessionId = generateSessionId();
				await SecureStore.setItemAsync("userSession", sessionId);

				setIsLoggedIn(true); // Set user as logged in
				console.log("Signin successful!");
			} else {
				console.error("User not found!");
			}
		} catch (error) {
			console.error("Signin failed:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			// Remove session data
			await SecureStore.deleteItemAsync("userSession");
			setIsLoggedIn(false); // Update the logged-in status
			console.log("User logged out successfully.");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const signup = async (Name: string, Email: string, Location: string) => {
		try {
			// Insert the user data
			await updateUserData(Name, Email, Location);

			// Generate a session ID and store it
			const sessionId = generateSessionId();
			await SecureStore.setItemAsync("userSession", sessionId);

			setIsLoggedIn(true); // Set user as logged in
			console.log("Signup successful!");
		} catch (error) {
			console.error("Signup failed:", error);
			throw error;
		}
	};

	useEffect(() => {
		checkLoginStatus(); // Check login status on initial render
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, logout, signup, signin, checkLoginStatus, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

function generateSessionId() {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
