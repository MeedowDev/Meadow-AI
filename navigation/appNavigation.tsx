import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AdvisorScreen from "../screens/AdvisorScreen";
import MenuScreen from "../screens/MenuScreen";
import InsightsScreen from "../screens/InsightsScreen";
import AccountScreen from "../screens/AccountScreen";
import NewsScreen from "../screens/NewsScreen";
import SpecificsScreen from "../screens/SpecificsScreen";
import BookMarkedScreen from "../screens/BookMarkedScreen";
import MapScreen from "../screens/MapScreen";
import { Ionicons } from "@expo/vector-icons";
import { HomeIcon, UserIcon, CpuChipIcon, GlobeAltIcon } from "react-native-heroicons/outline"; // Adjust the imports as needed
import { LogBox, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Simplified Stack Navigator for all screens
function MainStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Menu" component={MenuScreen} />
			<Stack.Screen
				name="Insights"
				component={InsightsScreen}
				options={({ navigation }) => ({
					headerTitle: "Insights",
					headerRight: () => (
						<TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Menu")}>
							<Ionicons name="menu-outline" size={30} color="green" />
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen name="FarmersPointScreen" component={FarmersPointScreen} />
			<Stack.Screen name="advisor" component={AdvisorScreen} />
			<Stack.Screen name="SpecificsScreen" component={SpecificsScreen} />
			<Stack.Screen name="NewsScreen" component={NewsScreen} />
		</Stack.Navigator>
	);
}

// Bottom Tab Navigator with fewer options
function TabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="HomeTab"
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ focused, size }) => <HomeIcon color={focused ? COLORS.SELECTED : COLORS.LIGHT_GRAY} size={size} />,
					headerShown: false, // Ensure no header for the Tab screens
				}}
			/>
			<Tab.Screen
				name="AdvisorTab"
				component={AdvisorScreen}
				options={{
					tabBarLabel: "Advisor",
					tabBarIcon: ({ focused, size }) => <CpuChipIcon color={focused ? COLORS.SELECTED : COLORS.LIGHT_GRAY} size={size} />,
				}}
			/>
			<Tab.Screen
				name="AccountScreen"
				component={AccountScreen}
				options={{
					tabBarLabel: "Account",
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
					component={InsightsScreen}
					options={({ navigation }) => ({
						headerTitle: "InsightsScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 20 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="AdvisorScreen"
					component={AdvisorScreen}
					options={({ navigation }) => ({
						headerTitle: "AdvisorScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
							<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="AccountScreen"
					component={AccountScreen}
					options={({ navigation }) => ({
						headerTitle: "Account", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="NewsScreen"
					component={NewsScreen}
					options={({ navigation }) => ({
						headerTitle: "NewsScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="SpecificsScreen"
					component={SpecificsScreen}
					options={({ navigation }) => ({
						headerTitle: "SpecificsScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="BookMarkedScreen"
					component={BookMarkedScreen}
					options={({ navigation }) => ({ 
						headerTitle: "BookMarkedScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="MapScreen"
					component={MapScreen}
					options={({ navigation }) => ({
						headerTitle: "MapScreen", // Keeps the title as it is
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 10 }} // Adjust margin to fit the spacing
								onPress={() => navigation.navigate("Menu")}
							>
								<Ionicons name="menu-outline" size={30} color="green" />
							</TouchableOpacity>
						),
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const COLORS = {
	LIGHT_GRAY: "#d3d3d3",
	SELECTED: "#4CAF50", // Change this to your desired selected color
};
