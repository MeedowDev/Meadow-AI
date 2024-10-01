import React from "react";
import { OVERLAY_STYLING, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground ,TouchableOpacity} from "react-native";

interface MenuProps {
    title: string;
    onPress: () => void;
}

const Menu = ({title, onPress }: MenuProps) => {
    return (

        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_MENU}>
        <TouchableOpacity onPress={onPress}>
                <View style={OVERLAY_STYLING}>
                    <Text style={[FONTS.REGULAR_FONT, {marginTop: 35,marginBottom:30,textAlign: "center"}]}>{title}</Text>
                </View>
        </TouchableOpacity>
        </View>
    );
};

export default Menu;
