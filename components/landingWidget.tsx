import React from "react";
import tw from "twrnc";
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView } from "react-native";

interface LandingWidgetProps {
	temperature: string;
	weather: string;
	season: string;
	humidity: string;
	windSpeed: { speed: number; direction: string };
}

const LandingWidget = ({ temperature, weather, season, humidity, windSpeed }: LandingWidgetProps) => {
	const currMonth = new Date().getMonth();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const currYear = new Date().getFullYear();
	return (
		<View style={[tw`h-[9.2rem] w-full`, styles.container]}>
			<ImageBackground
				source={require("../assets/images/harvesting_season.jpg")} // Replace with your image path
				style={tw`h-full w-full rounded-b-md`}
			>
				<View style={tw`w-full mt-[2rem] justify-start flex-row`}>
					<Text style={tw`ml-[20px] my-1 text-white text-2xl`}>
						{monthNames[currMonth]} {currYear}, Rainy season
					</Text>
				</View>
				<View style={tw`flex-row justify-end mt-10`}>
					<Text style={[tw`text-5xl text-white`, styles.boldtext]}>{Math.floor(Number(temperature))}°C</Text>
				</View>
				<View style={tw`flex-row justify-end`}>
					<Text style={tw`text-xl text-white mr-2 mt-[-10]`}>Looks like it is {weather}</Text>
				</View>

				
			</ImageBackground>
		</View>
	);
};

export default LandingWidget;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		// borderBottomRightRadius: 35,
		// borderBottomLeftRadius: 35,
		overflow: "hidden",
		opacity: 0.7,
	},
	boldtext: {
		fontFamily: "RubikMonoOne",
	},
});
