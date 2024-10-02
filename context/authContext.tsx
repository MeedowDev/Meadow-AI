// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateUserData } from "../db/update";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
	isLoggedIn: boolean;
	checkLoginStatus: () => Promise<void>;
	login: (Name: string, Email: string, Location: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkLoginStatus = async () => {
		const sessionId = await SecureStore.getItemAsync("userSession");
		setIsLoggedIn(!!sessionId); // Set isLoggedIn based on whether sessionId exists
	};

	const login = async (Name: string, Email: string, Location: string) => {
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

	useEffect(() => {
		checkLoginStatus(); // Check login status on initial render
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, checkLoginStatus, login }}>{children}</AuthContext.Provider>;
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
