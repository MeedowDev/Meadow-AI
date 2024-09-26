import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AdvisorCardWithText from "../components/AdvisorCardWithText";
import SideImageWithOverlay from "../components/SideImageOverlay";
import FilterButton from "../components/FilterButtons";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LocationContext } from "../context/locationContext";
import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import handleScoreModel from "../api/watsonxApi";

type AdvisorScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface AdvisorScreenProps {
	navigation: AdvisorScreenNavigationProp;
}

export default function InsightsScreen({ navigation }: AdvisorScreenProps) {
	const { userLocation, errorMsg } = useContext(LocationContext);
	const [weather, setWeather] = useState<string | null>(null);

	// useEffect(() => {
	// 	if (userLocation) {
	// 		getWeatherForecastByCoords(userLocation.coords.latitude, userLocation.coords.longitude).then((data) => {
	// 			setWeather(data);
	// 		});
	// 	}
	// }, [userLocation]);
	return (
		<View style={tw`flex-1`}>
			<ScrollView contentContainerStyle={tw`mb-4`}>
				<View style={tw`items-center`}>
					<AdvisorCardWithText
						text={userLocation ? weather ?? "Weather data not available" : errorMsg || "Location not available"}
					/>
				</View>
				<View style={tw`flex-row`}>
					<FilterButton label="A-Z" onPress={() => {
						if (userLocation) {
							handleScoreModel(
								userLocation.coords.latitude,
								userLocation.coords.longitude
							);
						}
					}} />
					<FilterButton label="Success Rate" onPress={handleScoreModel} />
					<FilterButton label="Price" onPress={handleScoreModel} />
				</View>
				<View style={tw`flex-row`}>
					<FilterButton label="Output" onPress={handleScoreModel} />
					<FilterButton label="Complexity" onPress={handleScoreModel} />
				</View>
				<View style={tw`p-1 mb-4`}>
					<SideImageWithOverlay
						imageUrl="https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk="
						title="GINGER"
						smallerTitle="Chinese ginger"
						text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
					/>
					<SideImageWithOverlay
						imageUrl="https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk="
						title="GINGER"
						smallerTitle="Chinese ginger"
						text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
					/>
					<SideImageWithOverlay
						imageUrl="https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk="
						title="GINGER"
						smallerTitle="Chinese ginger"
						text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
					/>
				</View>
				<View style={tw`flex-row justify-around mt-4 bg-white p-2 w-full shadow-lg`}>
					<TouchableOpacity style={tw`flex items-center`} onPress={() => navigation.navigate("Home")}>
						<Ionicons name="home-outline" size={25} color="green" />
						<Text style={tw``}>Home</Text>
					</TouchableOpacity>
					<TouchableOpacity style={tw`flex items-center`} onPress={() => navigation.navigate("Insights")}>
						<Ionicons name="bar-chart-outline" size={25} color="green" />
						<Text style={tw``}>Insights</Text>
					</TouchableOpacity>
					<TouchableOpacity style={tw`flex items-center`} onPress={() => navigation.navigate("NewsScreen")}>
						<Ionicons name="newspaper-outline" size={25} color="green" />
						<Text>News</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
