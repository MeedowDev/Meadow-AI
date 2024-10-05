import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { homeImageMap } from "../utils/localpaths";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface StackedVerticalCardProps {
	image: string;
	title: string;
	smallerTitle: string;
	text: string;
	onPress: () => void;
}
const StackedVerticalCard = ({ image, title, smallerTitle, text, onPress }: StackedVerticalCardProps) => {
	const currImage = homeImageMap[image];
	if (!currImage) {
		console.log("Image", image);
		console.error(`${image} not found in image map. Please add it to the imageMap object in ImageWithOverlay.tsx`);
	}
	return (
		<View style={[tw`m-auto mb-1% h-[100%] w-[100%]`, styles.rounded]}>
			<TouchableOpacity onPress={onPress} style={tw`[100%] w-[100%] bg-black`}>
				<ImageBackground source={currImage} style={tw`h-[100%] w-[100%] flex flex-col justify-center`}>
					<LinearGradient
						// Gradient at 229 degrees
						// Adjust the colors array to make the darkest point fairly translucent
						colors={["rgba(0, 0, 0, 0.28)", "rgba(0, 0, 0, 0.7)"]}
						start={[0.8, 0]}
						end={[0.1, 1]}
						style={tw`rounded-3xl w-[100%] h-[100%] flex flex-col justify-center`}
					>
						<Text style={tw`font-bold text-lg ml-4 text-white`}>{title}</Text>

						<Text style={tw`font-bold text-white ml-4 mb-2`}>{text}</Text>
					</LinearGradient>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
};

export default StackedVerticalCard;

const styles = StyleSheet.create({
	rounded: {
		borderRadius: 20,
		overflow: "hidden",
	},
	boldtext: {
		fontFamily: "RubikMonoOne",
	},
});
