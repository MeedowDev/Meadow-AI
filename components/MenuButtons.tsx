import React from "react";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface MenuProps {
    title: string;
}

const Menu = ({title}: MenuProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_MENU}>
                <View style={OVERLAY_STYLING}>
                    <Text style={[FONTS.REGULAR_FONT, {marginTop: 10, marginLeft:15,marginHorizontal:10}]}>{title}</Text>
                </View>
        </View>
    );
};

export default Menu;
