// import CardWithText from "../components/CardWithText";
// import EmptyCard from "../components/EmptyCard";
// import Freebuttons from "../components/Freebuttons";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from "react-native";
import tw from "twrnc";
import { LocationContext } from "../context/locationContext";
// import { Ionicons } from "@expo/vector-icons";
import { getCurrentWeather } from "../api/RealTimeWeather";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useState, useEffect, useContext } from "react";
import StackedVerticalCard from "../components/stackedVerticalCard";
import WeatherCard from "../components/weatherCard";
import VerticalCard from "../components/verticalCard";
import AiResponse from "../components/aiRespose";
import { fetchLlmData } from "../services/aiRecommendation";
import { useAuth } from "../context/authContext";
import { fetchBookedSeedsForUser, fetchAllUserData, fetchAllDataCache } from "../db/fetch";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
	navigation: HomeScreenNavigationProp;
}
export default function HomeScreen({ navigation }: HomeScreenProps) {
	const { userLocation } = useContext(LocationContext);
	const [temperature, settemperature] = useState<string | null>(null);
	const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
	const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);
	const [windSpeed, setWindSpeed] = useState<number | null>(null); // New state for wind speed
	const [pressure, setPressure] = useState<number | null>(null); // New state for pressure
	const [humidity, setHumidity] = useState<string | null>(null); // New state for humidity
	const [quarterlyData, setQuarterlyData] = useState<{ season: string } | null>(null); // State for quarterly data
	const [llmResponse, setLlmResponse] = useState<string | null>("null");
	const [selectedCrop, setSelectedCrop] = useState<string>("");
	const [selectedCropVariety, setSelectedCropVariety] = useState<string>("");
	const sampleLlmResponse = `Hello Mark!  
You’ve been growing **Gloria F1 cabbage**, and with the current rainy season, today’s tasks can help maximize your yield. Here are some suggestions on what to do:

### 1. **Inspect for Waterlogging**
   - Cabbage prefers well-drained soil. Excess water during the rainy season can lead to root rot or other diseases. Ensure there’s no standing water around the plants, and improve drainage if necessary.

### 2. **Monitor for Pests**
   - Cabbage is prone to pests such as aphids, caterpillars, and root maggots. After heavy rains, check the underside of leaves and stems for pests and remove them by hand or use organic pest control if necessary.

### 3. **Weeding**
   - Weeds thrive in the rainy season and can compete for nutrients with your cabbage plants. Hand weed or use shallow cultivation to keep the weeds in check, as Gloria F1 cabbage requires sufficient nutrients to grow properly.

### 4. **Apply Organic Mulch**
   - Mulching with materials such as straw or dried grass can help retain soil moisture, suppress weeds, and keep the roots cool. This is especially useful during periods of alternating rain and heat.

### 5. **Top Dress with Fertilizer**
   - If it's been a few weeks since transplanting, consider top-dressing your cabbage with nitrogen-rich fertilizer to encourage leafy growth. Rain can sometimes wash nutrients away from the topsoil, so replenish as needed.

### 6. **Disease Prevention**
   - Rainy weather can encourage fungal diseases like black rot or downy mildew. Inspect leaves for yellowing or dark spots, and remove any affected plants to prevent the spread of disease.

### 7. **Tie Leaves Together (Optional)**
   - As the cabbage heads begin to form, some farmers tie the outer leaves to protect the developing head from too much moisture or sun exposure.

Keep monitoring your Gloria F1 cabbage regularly during this rainy season for any signs of stress or disease, and adjust your care as needed.

For more in-depth guidance, consider checking resources from local agricultural experts or trusted organizations such as [FAO](http://www.fao.org).
`;

	const { user, crops } = useAuth();
	const aiResponseLocation = "HomeAdvisor"; //just for easier data cache retrival

	const defaultAIResponse =
		"Our Ai model is trained on hundreds of crops across East Africa. Use our **AI Advisor** to see what you can plant in your region!";

	useEffect(() => {
		const fetchLlmRecommendation = async () => {
			if (!user || !userLocation) return;
			const cropNames = crops?.map((crop) => crop.cropName);

			// TODO: let the farmer choose the crop they want to get recommendations for
			try {
				if (!cropNames || cropNames.length === 0) {
					throw new Error("No crops found");
				}
				console.log("Crops", cropNames[0]);

				setSelectedCrop(cropNames[0].includes("_") ? cropNames[0].split("_")[0] : cropNames[0]);
				setSelectedCropVariety(cropNames[0].includes("_") ? cropNames[0].split("_")[1] : "");

				const data = await fetchLlmData(
					user.id,
					String(userLocation?.coords.longitude),
					String(userLocation?.coords.latitude),
					userLocation,
					aiResponseLocation,
					{selectedCrop, selectedCropVariety},

					1
				);
				setLlmResponse(data); // Store the fetched LLM response
			} catch (error) {
				console.error("Error fetching LLM data:", error);
			}
		};

		fetchLlmRecommendation();
	}, [user, userLocation, crops]); // Empty dependency array to run once when component mounts

	useEffect(() => {
		if (userLocation) {
			getCurrentWeather(userLocation)
				.then((data) => {
					settemperature(data.current.temp_c);
					setWeatherCondition(data.current.condition.text);
					setIconUrl(data.current.condition.icon ? `https:${data.current.condition.icon}` : undefined);
					setWindSpeed(data.current.wind_mph); // Set wind speed
					setPressure(data.current.pressure_mb); // Set pressure
					setHumidity(data.current.humidity); // Set humidity
				})
				.catch((err) => console.log("***********Error fetching weather data: ", err));
		}
	}, [userLocation]);

	return (
		<View style={tw`flex-1 `}>
			<ScrollView contentContainerStyle={tw`items-center`}>
				<View style={tw`mt-[5rem] mb-4`}>
					<WeatherCard
						temperature={temperature ?? "NAN"}
						weather={weatherCondition ?? "NaN"}
						season={quarterlyData?.season || "Unknown Season"} // Ensure the correct value is passed
						humidity={humidity ?? "NaN"}
						windSpeed={windSpeed ?? 0} // Pass wind speed
						pressure={pressure ?? 0} // Pass pressure
					/>
				</View>
				<View style={tw`flex  h-[15rem] mx-4 flex-row`}>
					<View style={tw`p-1 flex w-[50%]`}>
						<VerticalCard
							image="aibg4"
							title="Your AI Advisor"
							smallerTitle=""
							text="Get immediate expert advice on what to plant this season!"
							onPress={() => navigation.navigate("AdvisorTab")}
						/>
					</View>
					<View style={tw`flex flex-col w-[50%] p-1`}>
						<View style={tw`h-[50%] pb-1`}>
							<StackedVerticalCard
								image="redTomatoes"
								title="Farming Insight"
								smallerTitle=""
								text="Learn how to make a quick compost pit with these steps"
								onPress={() => navigation.navigate("Insights")}
							/>
						</View>

						<View style={tw`h-[50%] pt-1`}>
							<StackedVerticalCard
								image="coffeeBerries"
								title="Farming News"
								smallerTitle=""
								text="Keep up with the latest trends in the farming industry"
								onPress={() => navigation.navigate("NewsScreen")}
							/>
						</View>
					</View>
				</View>
				{/* to here */}
				<View style={tw`mx-4 w-80 mt-4 mb-4 min-h-[5rem] bg-gray-200 p-4 rounded-3xl `}>
					<Text style={tw`font-bold text-lg`}>
						What should you do to your {selectedCropVariety} {selectedCrop} today?
					</Text>
					<AiResponse aiTextParam={llmResponse == null ? defaultAIResponse : (llmResponse ?? "loading...")} color="black" />
				</View>
			</ScrollView>
		</View>
	);
}

// const styles = StyleSheet.create({
// 	custom_background: {
// 		boder
// 	},
// });
