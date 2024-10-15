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

	const { user } = useAuth();

	useEffect(() => {
		const fetchLlmRecommendation = async () => {
			try {
				const data = await fetchLlmData(
					user.id,
					String(userLocation?.coords.longitude),
					String(userLocation?.coords.latitude),
					"HomeAdvisor",
					"Cabbage_Gloria F1",
					1
				);
				setLlmResponse(data); // Store the fetched LLM response
			} catch (error) {
				console.error("Error fetching LLM data:", error);
			}
		};

		fetchLlmRecommendation();
	}, [user, userLocation]); // Empty dependency array to run once when component mounts

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
				.catch((err) => console.log("Error fetching weather data: ", err));
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
							title="Your SMART Advisor"
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
					<Text style={tw`font-bold text-lg`}>What should you do to your Gloria F1 Cabbages today?</Text>
					<AiResponse aiTextParam={llmResponse ?? "loading..."} color="black" />
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
