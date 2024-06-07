import { Text, View,Image } from 'react-native'
import React, { Component ,useState, useEffect} from 'react'
import { LARGE_CONTAINER_STYLING,OVERLAY_STYLING, TOP_PADDING } from '../constants/ContainersStyling'
import { FONTS } from '../constants/Fonts'

interface FarmersOverlayProps {
  imageUrl: string;
  timeLine?: string;
  name: string;
  text: string;
  footer: string;
  index: number;
}

const FarmersOverlay: React.FC<FarmersOverlayProps> = ({ imageUrl, timeLine, name, text, footer, index}) => {

      return (
          <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FP}>
            <Image source={{ uri: imageUrl }} style={LARGE_CONTAINER_STYLING.IMAGE_IN_SMALL_CONTAINER_STYLING_FP}/>
              <View style={OVERLAY_STYLING}>
                  <Text style={[FONTS.REGULAR_FONT_POINT, {marginTop: 10,marginBottom:40, marginLeft: 60}]}>{name}</Text>
              {timeLine && <Text style={[FONTS.SNOW_REGULAR_FONT_TWO, { marginTop:-55, marginLeft: 185, fontSize: 7 }]}>{timeLine}</Text>}
              </View>
              <Text style={[FONTS.SNOW_REGULAR_FONT_POINT, {marginLeft: 10, marginTop:-40}]}>{text}</Text>
              <Text style={[FONTS.SNOW_REGULAR_FONT_POINT_F, {marginLeft: 35, marginTop:-100}]}>{footer}</Text>
      </View>
      )
    }

  export default FarmersOverlay;
