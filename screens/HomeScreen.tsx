import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

//constants
import {COLORS} from "../constants/Colors";
import {FONTS} from "../constants/Fonts";

export default function HomeScreen() {
	return (
		<View style={[tw`bg-white w-full h-full justify-center items-center`, {backgroundColor: COLORS.PRIMARY_COLOR}]}>
			<View style={tw`w-70 border `}>
				<Text style={FONTS.LARGE_TITLE}>The is LARGE TITLE</Text>
				<Text style={FONTS.GREEN_TITLE}>This is GREEN TITLE </Text>
				<Text style={FONTS.REGULAR_BOLD_FONT}>This is REGULAR BOLD FONT</Text>
				<Text style={FONTS.HIGHLIGHTED_TEXT_FONT}>This is HIGHLIGHTED FONT</Text>
				<Text style={FONTS.REGULAR_FONT}>This is REGULAR FONT</Text>
			</View>
		</View>
	);
}
