import { LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { OVERLAY_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { Image,View,ImageBackground,Text} from "react-native";
interface InsightsOverlayProps {
    imageUrl: string;
    title: string;
}

const InsightOverlay = ({ imageUrl, title }: InsightsOverlayProps) => {
    return (
        <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHTS}>
            <ImageBackground source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_LARGE_CONTAINER_STYLING_FP}>
                <View style={OVERLAY_STYLING}>
                    <Text style={[FONTS.SNOW_TITLE, {marginTop: 125,marginLeft: 10}]}>{title}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};


export default InsightOverlay;