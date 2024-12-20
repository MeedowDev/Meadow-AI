import React from "react";
import { OVERLAY_STYLING_EMPTY, LARGE_CONTAINER_STYLING} from "../constants/ContainersStyling";
import { FONTS } from "../constants/Fonts";

import { View, Text,Image } from "react-native";

interface CardWithTextProps {
    title: string;
    title2: string;
    text: string;
    text2: string;
    iconUrl?: string;
    windSpeed?: number | null; // New prop for wind speed
    humidity?: string // New prop for pressure
  }
  
  const CardWithText: React.FC<CardWithTextProps> = ({
    title,
    title2,
    text,
    text2,
    iconUrl,
    windSpeed,
    humidity,
  }) => {
    return (
      <View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_CARDWITHTEXT}>
        <View style={OVERLAY_STYLING_EMPTY}>
          <Text style={[FONTS.LARGE_TITLE, {marginTop: 20, marginLeft: 40, marginBottom: -28}]}>{title}</Text>
          <Text style={[FONTS.LARGE_TITLE, {marginLeft: 170, marginBottom: 8}]}>{title2}</Text>
          <Text style={[FONTS.LARGE_TITLE, {marginLeft: 50, top: 8}]}>{text}</Text>
          <Text style={[FONTS.REGULAR_FONT, {marginLeft: 140, bottom: 10}]}>{text2}</Text>
          
           {/* Container for the icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 90 }}>
          {/* Display the icon */}
          {iconUrl && (
            <>
              <Image
                source={{ uri: iconUrl }}
                style={{ width: 40, height: 50, marginRight: -45 }} // Adjust size and margin as needed
              />
              <Image
                source={{ uri: iconUrl }}
                style={{ width: 40, height: 30, marginLeft: 40 }} // Adjust size and margin as needed
              />
            </>
          )}
        </View>
  
          {/* Display wind speed */}
          {windSpeed !== null && (
            <Text style={[FONTS.REGULAR_FONT, {marginLeft: 170}]}>Wind: {windSpeed} mph</Text>
          )}
  
          {/* Display pressure */}
          {humidity !== null && (
            <Text style={[FONTS.REGULAR_FONT, {marginLeft: 40,bottom:15}]}>Humidity: {humidity} in</Text>
          )}
        </View>
      </View>
    );
  };
  
  export default CardWithText;