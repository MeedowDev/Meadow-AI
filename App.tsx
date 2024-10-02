import { ActivityIndicator } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { LocationProvider } from "./context/locationContext";
import { AuthProvider } from "./context/authContext";
import setupDatabase from "./db/dbSetup";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import { useState, useEffect, createContext } from "react";

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	//? Load fonts
	useEffect(() => {
		async function loadResources() {
			await Font.loadAsync({
				RubikMonoOne: require("./assets/fonts/RubikMonoOne.ttf"),
			});
			await setupDatabase();
			setFontsLoaded(true);
		}
		loadResources();
	}, []);
	if (!fontsLoaded) {
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
