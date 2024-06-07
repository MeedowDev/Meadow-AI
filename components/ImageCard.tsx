import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface ImageWithOverlayProps {
	imageUrl: { localImage: string; onlineImage: string };
	title: string;
	titleSubtext: string;
	text: string;
}

const ImageWithOverlay = ({ imageUrl, title, titleSubtext, text }: ImageWithOverlayProps) => {
    const inititalImageUrl = imageUrl.onlineImage? imageUrl.onlineImage : imageUrl.localImage;
    const [activelyUsedImageUrl, setImageUrl] = useState(inititalImageUrl);
	const handleImageError = () => {
		setImageUrl(imageUrl.localImage);
	};

	return (
		<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING}>
				<ImageBackground source={{ 
                    uri: activelyUsedImageUrl }} 
                    style={LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING}
                    onError={handleImageError}
                    >
					<View style={OVERLAY_STYLING}>
						<View style={tw`flex-row w-3/4 ml-[20px] items-center`}>
							<Text style={FONTS.SNOW_TITLE}>{title}</Text>
							<Text style={FONTS.SNOW_REGULAR_FONT}> {titleSubtext ? `(${titleSubtext})` : ""}</Text>
						</View>
						{text ? (
							<Text style={[FONTS.SNOW_REGULAR_FONT, { marginBottom: 15, marginLeft: 20, marginRight: 20 }]}>
								{text}
							</Text>
						) : null}
					</View>
				</ImageBackground>
				
		</View>
	);
};

export default ImageWithOverlay;
