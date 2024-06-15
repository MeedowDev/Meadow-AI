import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AdvisorScreen from "../screens/AdvisorScreen";
import MenuScreen from "../screens/MenuScreen";
import InsightsScreen from "../screens/InsightsScreen";
import FarmersPointScreen from "../screens/FarmersPointScreen";
import NewsScreen from "../screens/NewsScreen";
import SpecificsScreen from "../screens/SpecificsScreen";
import BookMarkedScreen from "../screens/BookMarkedScreen";
import { HomeIcon, UserIcon } from "react-native-heroicons/outline"; // Adjust the imports as needed
import { LogBox } from "react-native";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

function TabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ focused, size }) => <HomeIcon color={focused ? COLORS.SELECTED : COLORS.LIGHT_GRAY} size={size} />,
					headerShown: false, // Ensure no header for the Tab screens
				}}
			/>
			<Tab.Screen
				name="Advisor"
				component={AdvisorScreen}
				options={{
					tabBarLabel: "Advisor",
					tabBarIcon: ({ focused, size }) => <UserIcon color={focused ? COLORS.SELECTED : COLORS.LIGHT_GRAY} size={size} />,
				}}
			/>
			<Tab.Screen
				name="FarmersPoint"
				component={FarmersPointScreen}
				options={{
					tabBarLabel: "FarmersPoint",
					tabBarIcon: ({ focused, size }) => <UserIcon color={focused ? COLORS.SELECTED : COLORS.LIGHT_GRAY} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen
					name="Menu"
					options={{
						headerTitle: "Menu",
					}}
					component={MenuScreen}
				/>
				<Stack.Screen
					name="Insights"
					options={{
						headerTitle: "Insights",
					}}
					component={InsightsScreen}
				/>
				<Stack.Screen
					name="NewsScreen"
					options={{
						headerTitle: "News",
					}}
					component={NewsScreen}
				/>
				<Stack.Screen
					name="SpecificsScreen"
					options={{
						headerTitle: "Specifics",
					}}
					component={SpecificsScreen}
				/>
				<Stack.Screen
					name="BookMarkedScreen"
					options={{
						headerTitle: "Bookmarked",
					}}
					component={BookMarkedScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const COLORS = {
	LIGHT_GRAY: "#d3d3d3",
	SELECTED: "#4CAF50", // Change this to your desired selected color
};
