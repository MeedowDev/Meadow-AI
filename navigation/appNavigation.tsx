import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AdvisorScreen from "../screens/AdvisorScreen";
import MenuScreen from "../screens/MenuScreen";
import InsightsScreen from "../screens/InsightsScreen";
import SpecificsScreen from "../screens/SpecificsScreen";
import NewsScreen from "../screens/NewsScreen";
import BookMarkedScreen from "../screens/BookMarkedScreen";
import { HomeIcon, UserIcon, ChatBubbleLeftIcon } from "react-native-heroicons/outline";

const Stack = createNativeStackNavigator();
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
			<Stack.Screen name="FarmersPointScreen" component={HomeScreen} />
			<Stack.Screen name="advisor" component={AdvisorScreen} />
			<Stack.Screen name="Specifics" component={SpecificsScreen} />
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
				component={MainStack}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ focused, size }) => <HomeIcon color={focused ? "green" : "gray"} size={size} />,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="AdvisorTab"
				component={AdvisorScreen}
				options={({ navigation }) => ({
					headerTitle: "Your AI Advisor",
					tabBarIcon: ({ focused, size }) => <UserIcon color={focused ? "green" : "gray"} size={size} />,
					headerRight: () => (
						<TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Menu")}>
							<Ionicons name="menu-outline" size={30} color="green" />
						</TouchableOpacity>
					),
				})}
			/>
			<Tab.Screen
				name="ChatTab"
				component={BookMarkedScreen}
				options={{
					tabBarLabel: "Chat",
					tabBarIcon: ({ focused, size }) => <ChatBubbleLeftIcon color={focused ? "green" : "gray"} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
}
