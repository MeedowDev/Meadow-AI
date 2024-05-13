import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WatsonScreen from "../screens/AdvisorScreen";
import { LogBox } from "react-native";
import AdvisorScreen from "../screens/AdvisorScreen";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
				<Stack.Screen
					name="Watson"
					options={{
						headerTitle: "Advisor",
					}}
					component={AdvisorScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
