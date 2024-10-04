import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import tw from "twrnc";

const WeatherCard = () => {
	return (
		<View style={tw`twbg-white rounded-3xl p-4 bg-gray-200 w-80`}>
			<View style={tw`twflex flex-col justify-between mb-4`}>
				{/* Season Section */}
				<View style={tw`w-[100%] flex flex-row justify-around`}>
					<Text style={tw`font-bold text-lg`}>Season</Text>
					<Text style={tw`font-bold text-lg`}>Today</Text>
				</View>

				<View style={tw`items-center w-[100%] flex-row justify-around`}>
					<View style={tw`w-[50%] flex justify-center items-center`}>
						<MaterialCommunityIcons name="weather-fog" size={75} color="grey" />
					</View>
					<View style={tw`flex flex-row items-center w-[50%] justify-around`}>
						<MaterialCommunityIcons name="weather-partly-cloudy" size={50} color={COLORS.ACCENT_COLOR} />
						<View style={tw`flex flex-row`}>
							<Text style={[tw`font-bold text-lg mt-2`, { color: COLORS.ACCENT_COLOR }]}>H: 20°C{"\n"}L: 14°C</Text>
						</View>
					</View>
				</View>

				<View style={tw`items-center flex flex-row w-[100%] mt-2`}>
					<View style={tw`flex flex-col w-[50%] items-center`}>
						<Text style={tw`text-gray-500`}>Cold/Dry</Text>
						<Text style={tw`font-bold text-2xl text-gray-700`}>16°C–31°C</Text>
						<Text style={tw`text-gray-500`}>June \\ October</Text>
					</View>
					<View style={tw`flex flex-row w-[50%] justify-around px-2`}>
						<View style={tw`flex flex-col justify-start`}>
							<MaterialCommunityIcons name="weather-windy" size={24} color="grey" />
							<Text style={tw`text-gray-500`}>32.4 km/h{"\n"}south</Text>
						</View>

						<View style={tw`flex flex-col justify-start`}>
							<MaterialCommunityIcons name="water-percent" size={24} color="grey" />
							<Text style={tw`text-gray-500`}>62 Percent{"\n"}humidity</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default WeatherCard;
