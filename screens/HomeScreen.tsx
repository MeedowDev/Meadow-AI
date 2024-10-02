import ImageWithOverlay from "../components/ImageCard";
// import CardWithText from "../components/CardWithText";
// import EmptyCard from "../components/EmptyCard";
// import Freebuttons from "../components/Freebuttons";
import JustText from "../components/JustText";
import LandingWidget from "../components/landingWidget";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from "react-native";
import tw from "twrnc";
import { LocationContext } from "../context/locationContext";
// import { Ionicons } from "@expo/vector-icons";
import { getCurrentWeather } from "../api/RealTimeWeather";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useState, useEffect, useContext } from "react";
import StackedVerticalCard from "../components/stackedVerticalCard";
import { SPACER } from "../constants/ContainersStyling";
import VerticalCard from "../components/verticalCard";
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

	// Fetch weather data when location is available
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
			<ImageBackground
				style={tw`h-full w-full rounded-b-md`}
				blurRadius={5}
			>
				<ScrollView contentContainerStyle={tw`items-center`}>
					<LandingWidget
						temperature={temperature ?? "NAN"}
						weather={weatherCondition ?? "NaN"}
						season="Open Metero Response"
						humidity={humidity ?? "NaN"}
					></LandingWidget>

					{/* Adding this Block. From here */}
					<View style={tw`mt-[5rem] h-[10rem] mt-[2.5rem] space-y-3`}>
						<ScrollView
							horizontal={true}
							contentContainerStyle={{ paddingHorizontal: 15 }}
							showsHorizontalScrollIndicator={false}
						>
							<View
								style={[
									tw`flex justify-center flex-row items-center py-4 p-3 mr-4 rounded-3xl border border-gray-300 h-13`,
								]}
							>
								<Image source={require("../assets/icons/heavyrain.png")} style={tw`h-9 w-9 mr-1`} />
								<Text style={tw`text-black text-opacity-80 mr-1`}>Probability of Precipitation</Text>
								<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>17&#176;</Text>
							</View>
							<View
								style={tw`flex justify-center flex-row items-center border p-3 border-gray-300 rounded-3xl py-4 mr-4 h-13`}
							>
								<Image source={require("../assets/icons/moderaterain.png")} style={tw`h-9 w-9 mr-1`} />
								<Text style={tw`text-black text-opacity-80 mr-1`}>Average Humidity</Text>
								<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>20&#176;</Text>
							</View>
							<View
								style={tw`flex justify-center flex-row items-center border p-3 border-gray-300 rounded-3xl py-4 mr-4 h-13`}
							>
								<Image source={require("../assets/icons/cloud.png")} style={tw`h-9 w-9 mr-1`} />
								<Text style={tw`text-black text-opacity-80 mr-1`}>Wind Speed</Text>
								<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>23&#176;</Text>
							</View>
							<View
								style={tw`flex justify-center flex-row items-center border p-3 border-gray-300 rounded-3xl py-4 mr-4 h-13`}
							>
								<Image source={require("../assets/icons/partlycloudy.png")} style={tw`h-9 w-9 mr-1`} />
								<Text style={tw`text-black text-opacity-80 mr-1`}>UV</Text>
								<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>23&#176;</Text>
							</View>
						</ScrollView>
					</View>
					{/* All the way to here */}

					{/* Makes this block of code disappear. From here */}
					<View style={tw`flex mt-[-5rem] h-[30rem] flex-row`}>
						<View style={tw`p-1 flex w-[50%]`}>
							<VerticalCard
								image="grey"
								title="Farming Advisor"
								smallerTitle=""
								text="Get immediate expert advice on what to plant this season for free!"
								onPress={() => navigation.navigate("AdvisorScreen")}
							/>
						</View>
						<View style={tw`flex flex-col w-[50%] p-1`}>
							<View style={tw`h-[50%] pb-1`}>
								<StackedVerticalCard
									image="grey"
									title="Farming Insight"
									smallerTitle=""
									text="Learn how to make a quick compost pit with these steps"
									onPress={() => navigation.navigate("Insights")}
								/>
							</View>

							<View style={tw`h-[50%] pt-1`}>
								<StackedVerticalCard
									image="grey"
									title="Farming Advisor"
									smallerTitle=""
									text="Stakeholders undergo training on reducing post harvest loses at Kaguru Agricultural center"
									onPress={() => navigation.navigate("NewsScreen")}
								/>
							</View>
						</View>
					</View>
					{/* to here */}
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

// const styles = StyleSheet.create({
// 	custom_background: {
// 		boder
// 	},
// });
