import React from "react";
import { OVERLAY_STYLING_ClickableButtons, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface ClickableButtonsProps {
    title: string;
}

const ClickableButtons = ({title}: ClickableButtonsProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ClickableButtons}>
                <View style={OVERLAY_STYLING_ClickableButtons}>
                    <Text style={[FONTS.REGULAR_BOLD_FONT, {marginTop: 20, marginRight:10,marginLeft:15}]}>{title}</Text>
                </View>
        </View>
    );
};

export default ClickableButtons;
