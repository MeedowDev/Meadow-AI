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

const ImageWithOverlay = ({ imageUrl, title, text }: ImageWithOverlayProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FP}>
            <ImageBackground source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING_FP}>
                <View style={OVERLAY_STYLING}>
                    <Text style={[FONTS.SNOW_TITLE, {marginTop: 120,marginBottom:-30,marginLeft: 20}]}>{title}</Text>
                    <Text style={[FONTS.SNOW_REGULAR_FONT, {marginLeft: 20}]}>{text}</Text>
                </View>
            </ImageBackground>
        </View>
    );

};

export default ImageWithOverlay;
