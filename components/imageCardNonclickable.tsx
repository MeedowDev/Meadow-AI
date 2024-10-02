import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { cropImageMap } from "../utils/localpaths";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

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
		<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FARMERSPOINT}>
			<ImageBackground source={currImage} style={LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING_FP}>
				<View style={OVERLAY_STYLING}>
					<Text style={[FONTS.SNOW_TITLE, { marginTop: 120, marginBottom: -30, marginLeft: 20, fontFamily: "RubikMonoOne"  }]}>{title}</Text>
					{smallerTitle && (
						<Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop: -40, marginLeft: 110, fontSize: 7 }]}>
							{smallerTitle}
						</Text>
					)}
					<Text style={[FONTS.SNOW_REGULAR_FONT, { marginLeft: 20, marginBottom: -20 }]}>{text}</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default ImageWithOverlayNonclickable;