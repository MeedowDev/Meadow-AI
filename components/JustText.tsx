import React from "react";
import { LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { OVERLAY_STYLING_JUST_TEXT } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { Image,View,Text} from "react-native";
interface JustTextProps {
    title: string;
}

const  JustText= ({title }: JustTextProps) => {
    return (
            <View style={OVERLAY_STYLING_JUST_TEXT}>
                <Text style={[FONTS.LARGE_TITLE, {marginTop: 10, marginLeft: 30}]}>{title}</Text>
             </View>
    );
};


export default JustText;