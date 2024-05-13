import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

export default function HomeScreen() {
	return (
		<View style={tw`bg-white w-full h-full justify-center items-center`}>
			<Text style={tw``}>Home Screen</Text>
			<Text style={tw``}>This is the Home Screen</Text>
		</View>
	);
}
