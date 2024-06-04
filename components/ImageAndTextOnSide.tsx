import { LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { OVERLAY_STYLING } from "../constants/ContainersStyling";
import { OVERLAY_STYLING_HOWTO } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";
import { Image,View,ImageBackground,Text} from "react-native";
interface ImageAndTextOnSideProps {
    imageUrl: string;
    title: string;
    date:string;
  }
  
    const ImageAndTextOnSide = ({ imageUrl, title,date}: ImageAndTextOnSideProps ) => {
      return (
        <View style={[LARGE_CONTAINER_STYLING.SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT]}>
            <Image source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT}/>
            <View style={OVERLAY_STYLING}>
              <Text style={[FONTS.REGULAR_FONT, {marginTop: -160,paddingBottom:30,marginLeft: 180}]}>{title}</Text>
              {date && <Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop:10, marginLeft:180, fontSize: 10 }]}>{date}</Text>}
            </View>
        </View>
      );
}
export default ImageAndTextOnSide;