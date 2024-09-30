import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from 'react'
import { FONTS } from '../constants/Fonts'
import { LARGE_CONTAINER_STYLING, OVERLAY_STYLING, SMALL_OVERLAY_STYLING} from '../constants/ContainersStyling'

interface SideImageOverlayProps {
	imageUrl: string;
	smallerTitle: string;
	title: string;
	text: string;
  onPress: () => void;
}



  const SideImageWithOverlay = ({ imageUrl, title,smallerTitle, text, onPress }: SideImageOverlayProps ) => {
    return (
      <TouchableOpacity style={[LARGE_CONTAINER_STYLING.SMALL_ROUNDED_iMAGE_CONTAINER_STYLING]} onPress={onPress}>
          <Image source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_SMALL_CONTAINER_STYLING_FARMERSPOINT}/>
          <View >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[FONTS.LARGE_TITLE, {marginTop: -75,marginLeft: 90, fontSize: 22}]}>{title}</Text>
            {smallerTitle && <Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop:-65, marginLeft: 3, fontSize: 10 }]}>{smallerTitle}</Text>}
            </View>
            <Text style={[FONTS.REGULAR_FONT, {marginTop:-20,marginLeft: 90,fontSize: 11}]}>{text}</Text>
          </View>
      </TouchableOpacity>
    );
  }

export default SideImageWithOverlay;
