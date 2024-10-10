import { ActivityIndicator } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { LocationProvider } from "./context/locationContext";
import { AuthProvider } from "./context/authContext";
import setupDatabase from "./db/dbSetup";
import "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import * as Font from "expo-font";
import { useState, useEffect } from "react";

export default function App() {
	const [isReady, setIsReady] = useState(false);
	let dbInstance: SQLite.SQLiteDatabase | null = null;

	//? Load fonts
	useEffect(() => {
		async function initializeApp() {
			try {
				await setupDatabase(); 
				await Font.loadAsync({
					RubikMonoOne: require("./assets/fonts/RubikMonoOne.ttf"),
				});
				dbInstance = await SQLite.openDatabaseAsync("db.db"); 
				setIsReady(true); 
			} catch (error) {
				console.error("App initialization failed:", error);
				// Handle the initialization failure (e.g., show an error screen)
			}
		}

		initializeApp();
	}, []);

	if (!isReady) {
		return <ActivityIndicator />;
	}
	return (
		<AuthProvider>
			<LocationProvider>
				<AppNavigation />
			</LocationProvider>
		</AuthProvider>
	);
}
