import React from "react";
import { OVERLAY_STYLING_FREEBUTTON, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface FreebuttonsProps {
    title: string;
}

const Freebuttons = ({title}: FreebuttonsProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_FREEBUTTON}>
                <View style={OVERLAY_STYLING_FREEBUTTON}>
                    <Text style={[FONTS.HIGHLIGHTED_TEXT_FONT, {marginTop:4,marginLeft:13}]}>{title}</Text>
                </View>
        </View>
    );
};

export default Freebuttons;
