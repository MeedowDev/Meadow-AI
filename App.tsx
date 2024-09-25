import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import "react-native-gesture-handler";
import tw from "twrnc";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

const Tab = createMaterialTopTabNavigator();
export default function App() {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			console.log("Location granted", location);

		})();
	}, []);

	return <AppNavigation />;
}
