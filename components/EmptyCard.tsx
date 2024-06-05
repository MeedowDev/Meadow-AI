import React from "react";
import { OVERLAY_STYLING_EMPTY, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text, ImageBackground } from "react-native";

interface EmptyCardProps {
    title: string;
    text: string;
    text2:string;
    smallerText:string;
    smallerText2:string;
}

const EmptyCard = ({title, text,text2,smallerText,smallerText2}: EmptyCardProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_EMPTY}>
                <View style={OVERLAY_STYLING_EMPTY}>
                    <Text style={[FONTS.LARGE_TITLE, {marginTop: 30,marginBottom:15, marginLeft: 20}]}>{title}</Text>
                    <Text style={[FONTS.REGULAR_BOLD_FONT, {marginLeft: 23}]}>1.{text}</Text>
                    {smallerText && <Text style={[FONTS.REGULAR_FONT, { marginTop:-16, marginLeft: 110, fontSize: 10 }]}>{smallerText}</Text>}
                    <Text style={[FONTS.REGULAR_BOLD_FONT, {marginLeft: 23,marginTop: 20}]}>2.{text2}</Text>
                    {smallerText2 && <Text style={[FONTS.REGULAR_FONT, { marginTop:-16, marginLeft: 110, fontSize: 10 }]}>{smallerText2}</Text>}
                </View>
        </View>
    );
};

export default EmptyCard;
