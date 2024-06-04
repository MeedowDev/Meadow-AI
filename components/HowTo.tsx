import { View,Image,Text } from "react-native";
import { LARGE_CONTAINER_STYLING,OVERLAY_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

interface HowToProps {
    imageUrl: string;
    text: string;
  }
  
    const HowTo = ({ imageUrl, text }: HowToProps ) => {
      return (
        <View style={[LARGE_CONTAINER_STYLING.SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_HOWTO]}>
            <Image source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_SMALL_CONTAINER_STYLING_HOWTO}/>
            <View style={OVERLAY_STYLING}>
              <Text style={[FONTS.REGULAR_FONT, {marginLeft: 160,marginTop:-110}]}>{text}</Text>
            </View>
        </View>
      );
    }
  export default HowTo;