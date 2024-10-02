import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { LocationProvider } from "./context/locationContext";
import setupDatabase from "./db/dbSetup";
import "react-native-gesture-handler";
import * as Font from "expo-font";
// import tw from "twrnc";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, createContext } from "react";

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	//? Load fonts
	useEffect(() => {
		async function loadResources() {
			await Font.loadAsync({
				RubikMonoOne: require("./assets/fonts/RubikMonoOne.ttf"),
			});
			setFontsLoaded(true);
			await setupDatabase();
		}
		loadResources();
	}, []);
	if (!fontsLoaded) {
		return <ActivityIndicator />;
	}
	return (
		<LocationProvider>
			<AppNavigation />
		</LocationProvider>
	);
}
