import React from "react";
import tw from "twrnc";
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView } from "react-native";

interface LandingWidgetProps {
	temperature: string;
	weather: string;
	season: string;
}

const LandingWidget = ({ temperature, weather, season }: LandingWidgetProps) => {
	return (
		<View style={[tw`h-[30%] w-full`, styles.container]}>
			<ImageBackground
				source={require("../assets/images/planting_season.jpg")} // Replace with your image path
				style={tw`h-full w-full rounded-b-md`}
			>
				<View style={tw`w-full mt-[2rem] justify-start flex-row`}>
					<Text style={tw`ml-[20px] my-1 text-white text-2xl`}>{season}</Text>
				</View>
				<View style={tw`flex-row justify-end mt-10`}>
					<Text style={[tw`text-5xl text-white`, styles.boldtext]}>{temperature}°C</Text>
				</View>
				<View style={tw`flex-row justify-end`}>
					<Text style={tw`text-xl text-white mr-2 mt-[-10]`}>Feels like it is {weather}</Text>
				</View>

				<View style={tw`mt-[5rem] space-y-3`}>
					<ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>
						<View style={tw`flex justify-center items-center w-24l py-4 mr-4 rounded-3xl bg-white`}>
							<Image source={require("../assets/icons/heavyrain.png")} style={tw`h-11 w-11`} />
							<Text style={tw`text-black text-opacity-80`}>Probability of Precipitation</Text>
							<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>17&#176;</Text>
						</View>
						<View style={tw`flex justify-center items-center w-24 bg-white rounded-3xl py-4 mr-4`}>
							<Image source={require("../assets/icons/moderaterain.png")} style={tw`h-11 w-11`} />
							<Text style={tw`text-black text-opacity-80`}>Average Humidity</Text>
							<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>20&#176;</Text>
						</View>
						<View style={tw`flex justify-center items-center w-24 bg-white rounded-3xl py-4 mr-4`}>
							<Image source={require("../assets/icons/cloud.png")} style={tw`h-11 w-11`} />
							<Text style={tw`text-black text-opacity-80`}>Wind Speed</Text>
							<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>23&#176;</Text>
						</View>
						<View style={tw`flex justify-center items-center w-24 bg-white rounded-3xl py-4 mr-4`}>
							<Image source={require("../assets/icons/partlycloudy.png")} style={tw`h-11 w-11`} />
							<Text style={tw`text-black text-opacity-80`}>UV</Text>
							<Text style={tw`text-black text-opacity-80 text-xl font-semibold`}>23&#176;</Text>
						</View>
					</ScrollView>
				</View>
			</ImageBackground>
		</View>
	);
};

export default LandingWidget;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		borderBottomRightRadius: 35,
		borderBottomLeftRadius: 35,
        overflow: "hidden",
		opacity: 0.7,
	},
	boldtext: {
		fontFamily: "RubikMonoOne",
	},
});
