import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from "../screens/HomeScreen";
import AdvisorScreen from "../screens/AdvisorScreen";
import MenuScreen from "../screens/MenuScreen";
import { LogBox ,TouchableOpacity} from "react-native";
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
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
				<Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
				<Stack.Screen
					name="Watson"
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
            component={InsightsScreen}
            options={({ navigation }) => ({
            headerTitle: "InsightsScreen", // Keeps the title as it is
        headerRight: () => (
        <TouchableOpacity
                style={{ marginRight: 20}} // Adjust margin to fit the spacing
                onPress={() => navigation.navigate('Menu')}
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
                onPress={() => navigation.navigate('Menu')}
        >
            <Ionicons name="menu-outline" size={30} color="green" />
        </TouchableOpacity>
    ),
  })}
/>
                <Stack.Screen
            name="FarmersPointScreen"
            component={FarmersPointScreen}
            options={({ navigation }) => ({
            headerTitle: "FarmersPointScreen", // Keeps the title as it is
        headerRight: () => (
        <TouchableOpacity
                style={{ marginRight: 10 }} // Adjust margin to fit the spacing
                onPress={() => navigation.navigate('Menu')}
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
                onPress={() => navigation.navigate('Menu')}
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
                onPress={() => navigation.navigate('Menu')}
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
        onPress={() => navigation.navigate('Menu')}
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
