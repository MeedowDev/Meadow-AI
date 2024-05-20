import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import tw from "twrnc";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createMaterialTopTabNavigator();
export default function App() {
	return <AppNavigation />;	
}
