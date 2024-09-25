import React from "react";
import {LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface ClickableButtonsProps {
    title: string;
}

const ClickableButtons = ({title}: ClickableButtonsProps) => {
    return (
        <View>
                <View>
                    <Text style={[FONTS.REGULAR_BOLD_FONT, {marginTop: 20, marginRight:10,marginLeft:15}]}>{title}</Text>
                </View>
        </View>
    );
};

export default ClickableButtons;
