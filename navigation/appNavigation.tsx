import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from "../screens/HomeScreen";
import { LogBox } from "react-native";

import AdvisorScreen from "../screens/AdvisorScreen";
import MenuScreen from "../screens/MenuScreen";
import { LogBox } from "react-native";
import { RootStackParamList } from '../types';
import InsightsScreen from "../screens/InsightsScreen";
import FarmersPointScreen from "../screens/FarmersPointScreen";
import NewsScreen from "../screens/NewsScreen";
import SpecificsScreen from "../screens/SpecificsScreen";
import BookMarkedScreen from "../screens/BookMarkedScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" options={{ headerShown: true }} component={HomeScreen} />
				<Stack.Screen
					name="Advisor"
					options={{
						headerTitle: "Advisor",
					}}
					component={AdvisorScreen}
				/>
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
                    name="AdvisorScreen"
                    options={{
                        headerTitle: "Advisor",
                    }}
                    component={AdvisorScreen}
                />
                <Stack.Screen
                    name="FarmersPointScreen"
                    options={{
                        headerTitle: "FarmersPoint",
                    }}
                    component={FarmersPointScreen}
                />
                <Stack.Screen
                    name="NewsScreen"
                    options={{
                        headerTitle: "NewsScreen",
                    }}
                    component={NewsScreen}
                />
                <Stack.Screen
                    name="SpecificsScreen"
                    options={{
                        headerTitle: "SpecificsScreen",
                    }}
                    component={SpecificsScreen}
                />
                <Stack.Screen
                    name="BookMarkedScreen"
                    options={{
                        headerTitle: "BookMarkedScreen",
                    }}
                    component={BookMarkedScreen}
                />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
