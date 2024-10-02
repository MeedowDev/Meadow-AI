import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import AdvisorCardWithText from "../components/AdvisorCardWithText";
import SideImageWithOverlay from "../components/SideImageOverlay";
import FilterButton from "../components/FilterButtons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LocationContext } from "../context/locationContext";
import { getMockScoreModel } from "../api/simWatsonxAPI";
import { cropImageMap } from "../utils/localpaths";
import { addDataToDB, getAllData } from "../db/update";

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
		return <Text style={tw`text-center`}>Loading crop data...</Text>;
	}

	return (
		<View style={tw`flex-1`}>
			<ScrollView contentContainerStyle={tw`mb-4`}>
				<View style={tw`items-center`}>
					<AdvisorCardWithText text="Based on your location, we recommend the following crops for you to grow. These crops have been selected based on the upcoming season. Checking with the local agricultural office is recommended for more accurate results." />
				</View>
				<View style={tw`flex-row`}>
					{/* Filter buttons, Currently test buttons 😅😅 */}
					<FilterButton
						label="A-Z"
						onPress={async () => {
							addDataToDB();
							getAllData();
						}}
					/>
					<FilterButton label="Success Rate" onPress={() => {}} />
					<FilterButton label="Price" onPress={() => {}} />
				</View>
				<View style={tw`flex-row`}>
					<FilterButton label="Output" onPress={() => {}} />
					<FilterButton label="Complexity" onPress={() => {}} />
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
