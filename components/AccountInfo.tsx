import { View,Image,Text } from "react-native";
import { LARGE_CONTAINER_STYLING,OVERLAY_STYLING } from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

interface AccountInfoProps {
    imageUrl: string;
    contact: string;
    name:string;
    location: string;
  }
  
    const AccountInfo = ({ imageUrl,contact, name,location }: AccountInfoProps ) => {
      return (
        <View style={[LARGE_CONTAINER_STYLING.SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT]}>
            <Image source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_SMALL_CONTAINER_STYLING_ACCOUNT}/>
            <View style={[OVERLAY_STYLING,{flexDirection:"row"}]}>
                <Text style={[FONTS.REGULAR_FONT, {marginLeft: 0,marginTop:60}]}>Name: {name}</Text>
                <Text style={[FONTS.REGULAR_FONT, {marginLeft: -90,marginTop:110}]}>Contact: {contact}</Text>
                <Text style={[FONTS.REGULAR_FONT, {marginLeft: -98,marginTop:160}]}>Location: {location}</Text>
                <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT}>
                  <Text style={[FONTS.REGULAR_FONT, {marginLeft: 0,marginTop:1}]}>Edit</Text>
                </View>
                <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_CONTACT}>
                  <Text style={[FONTS.REGULAR_FONT, {marginLeft: 0,marginTop:1}]}>Edit</Text>
                </View>
                <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_LOCATION}>
                  <Text style={[FONTS.REGULAR_FONT, {marginLeft: 0,marginTop:1}]}>Edit</Text>
                </View>
            </View>
        </View>
      );
    }
  export default AccountInfo;