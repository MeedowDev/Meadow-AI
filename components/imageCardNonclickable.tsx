import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { cropImageMap } from "../utils/localpaths";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ImageWithOverlayNonclickableProps {
	image: string;
	title: string;
	smallerTitle: string;
	text: string;
}
const ImageWithOverlayNonclickable = ({ image, title, smallerTitle, text }: ImageWithOverlayNonclickableProps) => {
	const currImage = cropImageMap[image];
	if (!currImage) {
		console.log("Image", image);
		console.error(`${image} not found in image map. Please add it to the imageMap object in ImageWithOverlay.tsx`);
	}
	return (
		<View style={[LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FARMERSPOINT, tw`w-[97%] mx-auto bg-white`]}>
			<ImageBackground source={currImage} style={[LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING_FP, tw`w-[100%]`]}>
				<LinearGradient
					// Gradient at 229 degrees
					// Adjust the colors array to make the darkest point fairly translucent
					colors={["rgba(0, 0, 0, 0.28)", "rgba(0, 0, 0, 0.7)"]}
					start={[0.8, 0]}
					end={[0.1, 1]}
					style={tw`rounded-3xl p-4 w-[100%] h-[100%]`}
				>
					<Text style={[styles.boldtext, tw` text-4xl mt-[45%] mx-5 text-white`]}>{title}</Text>

				</LinearGradient>
			</ImageBackground>
		</View>
	);
};

export default ImageWithOverlayNonclickable;

const styles = StyleSheet.create({

	boldtext: {
		fontFamily: "RubikMonoOne",
	},
});
