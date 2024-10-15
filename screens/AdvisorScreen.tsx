import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import AdvisorCardWithText from "../components/AdvisorCardWithText";
import SideImageWithOverlay from "../components/SideImageOverlay";
import FilterButton from "../components/FilterButtons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LocationContext } from "../context/locationContext";
import { getMockScoreModel } from "../api/simWatsonxAPI";
import { cropImageMap } from "../utils/localpaths";
import { COLORS } from "../constants/Colors";
import { getWeatherForecastByCoords } from "../api/openmeteoApi";
import handleScoreModel from "../api/watsonxApi";

//!consider the seed instead of images of crops instead
type AdvisorScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface AdvisorScreenProps {
	navigation: AdvisorScreenNavigationProp;
}

export default function InsightsScreen({ navigation }: AdvisorScreenProps) {
	const { userLocation, errorMsg } = useContext(LocationContext);
	const [weather, setWeather] = useState<string | null>(null);

	const [cropData, setCropData] = useState<Array<{ crop: string; confidence: number; relatedCrops: Array<{ crop: string; confidence: number }> }> | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const longitude = String(userLocation?.coords.longitude);
	const latitude = String(userLocation?.coords.latitude);

	const formatedDate = (date: Date | string): string => {
		const d = typeof date === "string" ? new Date(date) : date; // Convert string to Date object if needed
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
		const day = String(d.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const date = formatedDate(new Date());

	const loadingTexts = [
		"Analyzing the upcoming season's weather...",
		"Assessing your location's weather and climate...",
		"Checking the soil quality of your location...",
		"Generating crop recommendations...",
	];

	useEffect(() => {
		const fetchCropData = async () => {
			if (userLocation) {
				const { latitude, longitude } = userLocation.coords;
				const response = await getMockScoreModel(latitude, longitude);
				if (response) {
					// Assuming response.predictions is an array of crops
					setCropData(response.predictions);
					console.log(JSON.stringify(response.predictions, null, 2)); // Log fetched data
				}
			}
			setLoading(false);
		};

		fetchCropData();
	}, [userLocation]);

	if (loading) {
		return (
			<View style={tw`items-center`}>
				<AdvisorCardWithText text="Based on your location, we recommend the following crops for you to grow. These crops have been selected based on the upcoming season. Checking with the local agricultural office is recommended for more accurate results." />
				<Text style={tw`text-center`}>Loading crop data...</Text>
			</View>
		);
	}
	return (
		<View style={tw`flex-1`}>
			<ScrollView contentContainerStyle={tw`mb-4`}>
				<View style={tw`items-center`}>
					<AdvisorCardWithText text="Based on your location, we recommend the following crops for you to grow. These crops have been selected based on the upcoming season. Checking with the local agricultural office is recommended for more accurate results." />
				</View>
				{/* <View style={tw`flex-row`}>
					<FilterButton label="A-Z" onPress={async () => {}} />
					<FilterButton
						label="Success Rate"
						onPress={() => {
							getWeatherForecastByCoords(Number(longitude), Number(latitude)).then((data) => {
								console.log("Weather Data: ", data);
							});
						}}
					/>
					<FilterButton
						label="Output Seasons"
						onPress={async () => {
							console.log("Output Seasons button pressed");
							console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Log coordinates

							const quarterlyData = await handleScoreModel(Number(latitude), Number(longitude));

							// Check if quarterlyData includes a season and log it
							if (quarterlyData && quarterlyData.season) {
								console.log("Quarterly Data Received: ", quarterlyData); // Log the entire response
								const season = quarterlyData.season;
							} else {
								console.log("No quarterly data or seasons found");
							}
						}}
					/>
				</View> */}
				<View style={tw`flex-row align-center items-center justify-between w-[94%] h-15 m-auto`}>
					<TouchableOpacity
						style={[
							tw`flex items-center justify-center h-[60%] px-3 rounded-xl w-[55%]`,
							{ backgroundColor: COLORS.ACCENT_COLOR },
						]}
					>
						<Text style={tw`text-white text-center`}>See new options</Text>
					</TouchableOpacity>
					<View style={tw`flex flex-row items-center justify-around h-[60%]`}>
						<TouchableOpacity
							style={tw`min-w-[3rem] rounded-xl border border-gray-500 mx-[2px] h-[100%] justify-center items-center`}
						>
							<MaterialCommunityIcons name="chevron-left" size={20} style={tw`text-gray-500`} />
						</TouchableOpacity>
						<Text style={tw`text-center mx-1`}>1/1</Text>

						<TouchableOpacity
							style={tw`min-w-[3rem] rounded-xl border border-gray-500 mx-[2px] h-[100%] justify-center items-center`}
						>
							<MaterialCommunityIcons name="chevron-right" size={20} style={tw`text-gray-500`} />
						</TouchableOpacity>
					</View>
				</View>

				{/* Dynamically render SideImageWithOverlay components */}
				<View style={tw`p-1 mb-4`}>
					{cropData && cropData.length > 0 ? (
						cropData.map((crop, index) => {
							const cropName = crop.crop.charAt(0).toUpperCase() + crop.crop.slice(1).toLowerCase(); // Format the name
							const confidence = crop.confidence;
							// Use require to dynamically set the image path
							const imageUrl = cropImageMap[cropName];
							return (
								<SideImageWithOverlay
									key={index} // Use index as the key
									imageSource={imageUrl}
									title={cropName}
									smallerTitle={cropName}
									text={`Suitability: ${
										confidence * 100
									}%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nPrice per kg: 515.22 Ksh`}
									onPress={() => navigation.navigate("SpecificsScreen", { cropIndex: index, cropName })}
								/>
							);
						})
					) : (
						<Text>No crops available.</Text> // Fallback if no crops are found
					)}
				</View>
			</ScrollView>
		</View>
	);
}
