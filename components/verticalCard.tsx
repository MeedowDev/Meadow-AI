import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { homeImageMap } from "../utils/localpaths";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

interface VerticalCardProps {
	image: string;
	title: string;
	smallerTitle: string;
	text: string;
	onPress: () => void;
}
const VerticalCard = ({ image, title, smallerTitle, text, onPress }: VerticalCardProps) => {
	const currImage = homeImageMap[image];
	if (!currImage) {
		console.log("Image", image);
		console.error(`${image} not found in image map. Please add it to the imageMap object in ImageWithOverlay.tsx`);
	}
	return (
		<View style={[tw`h-[100%]`, styles.rounded]}>
			<ImageBackground source={currImage} style={tw`h-[100%] w-[100%]`}>
				<TouchableOpacity onPress={onPress}>
					<View style={tw``}>
						<Text style={[FONTS.SNOW_TITLE, { marginTop: 120, marginBottom: -30, marginLeft: 20 }]}>{title}</Text>
						{smallerTitle && (
							<Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop: -40, marginLeft: 110, fontSize: 7 }]}>
								{smallerTitle}
							</Text>
						)}
						<Text style={[FONTS.SNOW_REGULAR_FONT, { marginLeft: 20, marginBottom: -20 }]}>{text}</Text>
					</View>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default VerticalCard;

const styles = StyleSheet.create({
	rounded: {
		borderRadius: 20,
        overflow: "hidden"
	},
	boldtext: {
		fontFamily: "RubikMonoOne",
	},
});

