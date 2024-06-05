import React from "react";
import { OVERLAY_STYLING_EMPTY, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface CardWithTextProps {
    title: string;
    title2:string;
    text: string;
    text2: string;
}

const CardWithText = ({title, title2,text,text2}: CardWithTextProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_CARDWITHTEXT}>
                <View style={OVERLAY_STYLING_EMPTY}>
                    <Text style={[FONTS.LARGE_TITLE, {marginTop: 20, marginLeft: 40,marginBottom: -27}]}>{title}</Text>
                    <Text style={[FONTS.LARGE_TITLE, {marginLeft: 170,marginBottom: 20}]}>{ title2}</Text>
                    <Text style={[FONTS.REGULAR_FONT, {marginLeft: 40}]}>{text}</Text>
                    <Text style={[FONTS.REGULAR_FONT, {marginLeft: 180,bottom:15}]}>{text2}</Text>
                </View>
        </View>
    );
};

export default CardWithText;
