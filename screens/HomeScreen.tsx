import ImageWithOverlay from "../components/ImageCard";
import CardWithText from "../components/CardWithText";
import EmptyCard from "../components/EmptyCard";
import Freebuttons from "../components/Freebuttons";
import JustText from "../components/JustText";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import { LocationContext } from "../context/locationContext";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentWeather} from "../api/RealTimeWeather";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useState,useEffect,useContext } from "react";
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
				setHumidity(data.current.humidity); // Set humidity
			  })
			  .catch((err) => console.log("Error fetching weather data: ", err));
		  }
		}, [userLocation]);

	return (
		<View style={tw`flex-1 `}>
			<View style={tw`flex-row justify-between  bg-white h-20 w-full shadow-lg`}>
				<TouchableOpacity style={tw`p-5`} onPress={() => navigation.navigate("Menu")}>
					<Ionicons name="menu-outline" size={40} color="green" />
				</TouchableOpacity>
				<TouchableOpacity style={tw`p-5`} onPress={() => navigation.navigate("FarmersPointScreen")}>
					<Ionicons name="person-circle-outline" size={35} color="green" />
				</TouchableOpacity>
			</View>
			<ScrollView contentContainerStyle={tw`bg-white items-center`}>
				<View>
				<CardWithText
            	 title="Season"
				 title2="Today"
				 text={weather ? `${weather}°C` : "Loading..."} // Display weather or loading message
				 text2={weatherCondition || "Loading..."} // Display weather condition or loading message
				 iconUrl={iconUrl} // Pass the icon URL as a prop to CardWithText
				 windSpeed={windSpeed} // Pass the wind speed to CardWithText
				 humidity={humidity ? `${humidity}%` : "Loading..."} // Pass the humidity to CardWithText
          			/>

					</View>
				<View>
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
				</View>
				<View>
					<ImageWithOverlay
						imageUrl="https://images.unsplash.com/photo-1539519532614-723937382b86?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						title="Farming Advisor"
						smallerTitle=""
						text="Get immediate expert advice on what to plant this season for free!"
						onPress={() => navigation.navigate("AdvisorScreen")}
					/>
					<ImageWithOverlay
						imageUrl="https://media.istockphoto.com/id/479440915/photo/compost-with-composted-earth.webp?s=1024x1024&w=is&k=20&c=2jrCMGulru42bQVUDgvHZXSS9AI_ssd1yIKwrCaZkOQ="
						title="Farming Insight"
						smallerTitle=""
						text="Learn how to make a quick compost pit with these steps"
						onPress={() => navigation.navigate("Insights")}
					/>
				</View>
				{
					<View style={tw`bottom-30 right-20`}>
						<JustText title="Meru News" text="" />
					</View>
				}
				<View>
					<ImageWithOverlay
						imageUrl="https://media.istockphoto.com/id/1713057083/photo/happy-orchard-owners-during-autumn-harvest-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=TY7XBRJbiBkstk1CEpeeX1c-sVWWxuHHHVW8Bg4T3Sg="
						title="Stakeholders training"
						smallerTitle=""
						text="Stakeholders undergo training on reducing post harvest loses at Kaguru Agricultural center"
						onPress={() => navigation.navigate("NewsScreen")}
					/>
				</View>
			</ScrollView>
		</View>
	);
	}