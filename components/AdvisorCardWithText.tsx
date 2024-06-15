import React from "react";
import { OVERLAY_STYLING_EMPTY, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface AdvisorCardWithTextProps {
    text: string;
}

const AdvisorCardWithText = ({text}: AdvisorCardWithTextProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ADVISORCARDWITHTEXT}>
                <View style={OVERLAY_STYLING_EMPTY}>
                    <Text style={[FONTS.REGULAR_FONT, {marginLeft: 30,marginTop:30}]}>{text}</Text>
                </View>
        </View>
    );
};

export default AdvisorCardWithText;
