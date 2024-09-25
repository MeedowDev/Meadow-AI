import React, { useState } from "react";
import tw from "twrnc";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

interface ImageWithOverlayProps {
    imageUrl: string;
    title: string;
    smallerTitle:string;
    text: string;
    onPress: () => void;
}
const ImageWithOverlay = ({ imageUrl, title,smallerTitle, text ,onPress}: ImageWithOverlayProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FARMERSPOINT}>
            <ImageBackground source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING_FP}>
            <TouchableOpacity onPress={onPress}>
                <View style={OVERLAY_STYLING}>
                    <Text style={[FONTS.SNOW_TITLE, {marginTop: 120,marginBottom:-30,marginLeft: 20}]}>{title}</Text>
                    {smallerTitle && <Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop:-40, marginLeft: 110, fontSize: 7 }]}>{smallerTitle}</Text>}
                    <Text style={[FONTS.SNOW_REGULAR_FONT, {marginLeft: 20}]}>{text}</Text>
                </View>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );

};

export default ImageWithOverlay;
