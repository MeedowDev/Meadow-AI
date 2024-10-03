// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateUserData } from "../db/update";
import { fetchUserDataByEmail } from "../db/fetch";
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
    logout: () => Promise<void>;
    signup: (Name: string, Email: string, Location: string) => Promise<void>;
    signin: (Email: string) => Promise<void>;
    checkLoginStatus: () => Promise<void>;
}

// Update AuthContext to include user data
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserData | null>(null); // State to hold the user data

    const checkLoginStatus = async () => {
        const sessionId = await SecureStore.getItemAsync("userSession");
        setIsLoggedIn(!!sessionId); // Set isLoggedIn based on whether sessionId exists
    };

    const clearSession = async () => {
        await SecureStore.deleteItemAsync("userSession");
        await SecureStore.deleteItemAsync("userEmail");
		setIsLoggedIn(false);
        setUser(null); // Clear user data on logout
    }

    const startSession = async (email: string) => {
        const sessionId = generateSessionId();
        await SecureStore.setItemAsync("userSession", sessionId);
        await SecureStore.setItemAsync("userEmail", email);
    }

    const fetchAndSetUser = async (email: string) => {
        const userData = await fetchUserDataByEmail(email);
        if (userData && typeof userData === 'object' && 'Email' in userData && 'Name' in userData && 'Location' in userData && 'id' in userData) {
			console.log("Fetched and set user data:", userData);
            setUser(userData as UserData); // Store user data in state
        }
    };

    const signin = async (Email: string) => {
        try {
            await fetchAndSetUser(Email); // Fetch user data
            await startSession(Email);
            setIsLoggedIn(true);
            console.log("Signin successful!");
        } catch (error) {
            console.error("Signin failed:", error);
        }
    };

    const signup = async (Name: string, Email: string, Location: string) => {
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
        <AuthContext.Provider value={{ isLoggedIn, user, logout, signup, signin, checkLoginStatus }}>
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
