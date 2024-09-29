import ImageWithOverlay from "../components/ImageCard";
import CardWithText from "../components/CardWithText";
import EmptyCard from "../components/EmptyCard";
import Freebuttons from "../components/Freebuttons";
import LandingWidget from "../components/landingWidget";
import JustText from "../components/JustText";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import { LocationContext } from "../context/locationContext";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentWeather } from "../api/RealTimeWeather";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useState, useEffect, useContext } from "react";
import { SPACER} from "../constants/ContainersStyling";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
	navigation: HomeScreenNavigationProp;
}
export default function HomeScreen({ navigation }: HomeScreenProps) {
	const { userLocation } = useContext(LocationContext);
	const [weather, setWeather] = useState<string | null>(null);
	const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
	const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);
	const [windSpeed, setWindSpeed] = useState<number | null>(null); // New state for wind speed
	const [pressure, setPressure] = useState<number | null>(null); // New state for pressure
	const [humidity, setHumidity] = useState<number | null>(null); // New state for humidity

	// Fetch weather data when location is available
	useEffect(() => {
		if (userLocation) {
			getCurrentWeather(userLocation)
				.then((data) => {
					setWeather(data.current.temp_c);
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
			<ScrollView contentContainerStyle={tw`bg-white items-center`}>
				<LandingWidget temperature="22" weather="Cloudy" season="October 2024, Rainy Season"></LandingWidget>

				{/* <View style={tw`flex-row justify-between  bg-white h-20 w-full`}>
					<TouchableOpacity style={tw`p-5`} onPress={() => navigation.navigate("Menu")}>
						<Ionicons name="menu-outline" size={40} color="green" />
					</TouchableOpacity>
					<TouchableOpacity style={tw`p-5`} onPress={() => navigation.navigate("FarmersPointScreen")}>
						<Ionicons name="person-circle-outline" size={35} color="green" />
					</TouchableOpacity>
				</View> */}
				<View style={SPACER}></View>
				{/* <View>
					<CardWithText
						title="Season"
						title2="Today"
						text={weather ? `${weather}°C` : "Loading..."} // Display weather or loading message
						text2={weatherCondition || "Loading..."} // Display weather condition or loading message
						iconUrl={iconUrl} // Pass the icon URL as a prop to CardWithText
						windSpeed={windSpeed} // Pass the wind speed to CardWithText
						pressure={pressure} // Pass the pressure to CardWithText
						humidity={humidity} // Pass the humidity to CardWithText
					/>
				</View> */}
				{/* <View>
					<EmptyCard
						title="Book marked"
						text="Avocados:"
						smallerText="Hass avoca..."
						text2="Tomatoes:"
						smallerText2=" Anasal f1 h..."
						onPress={() => navigation.navigate("BookMarkedScreen")}
					/>
					<Freebuttons title="OPEN" />

					<Freebuttons title="OPEN" />
				</View> */}
				<View style={tw` mt-[40%]`}>
					<ImageWithOverlay
						image="coffeeBerries.png"
						title="Farming Advisor"
						smallerTitle=""
						text="Get immediate expert advice on what to plant this season for free!"
						onPress={() => navigation.navigate("AdvisorTab")}
					/>
					<ImageWithOverlay
						image="farmerInTeaFarm.png"
						title="Farming Insight"
						smallerTitle=""
						text="Learn how to make a quick compost pit with these steps"
						onPress={() => navigation.navigate("Insights")}
					/>
				</View>

				<View>
					<ImageWithOverlay
						image="redTomatoes.png"
						title="Farming Advisor"
						smallerTitle=""
						text="Get immediate expert advice on what to plant this season for free!"
						onPress={() => navigation.navigate("NewsScreen")}
					/>
				</View>
				<View style={tw`bottom-30 right-20`}>
					<JustText title="Meru News" text="" />
				</View>
			</ScrollView>
		</View>
	);
}
