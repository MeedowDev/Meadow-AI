import React from "react";
import { Image, View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import { FONTS } from "../constants/Fonts";
import {
  LARGE_CONTAINER_STYLING,
  TOP_PADDING,
} from "../constants/ContainersStyling";
import FarmersOverlay from "../components/FarmersPoint";
import InsightOverlay from "../components/Insights";
import HowTo from "../components/HowTo";
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  return (
    <View style={tw`bg-white relative`}>
          <ScrollView contentContainerStyle={tw`bg-white items-center`}>
          <HowTo
         imageUrl={
          "https://plus.unsplash.com/premium_photo-1682092016074-b136e1acb26e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        text={`How to improve farming 
efficiency in small spaces
at almost zero costs!`} 

        />
        <HowTo
         imageUrl={
          "https://images.unsplash.com/photo-1598903763023-fcb03301c845?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        text={`Get immediate expert advice on what to plant this season for free!`} 

        />
         <HowTo
         imageUrl={
          "https://plus.unsplash.com/premium_photo-1663045287051-cbc311f6d7a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        text={`How to improve farming 
efficiency in small spaces
at almost zero costs!`} 
        />
    </ScrollView>
  </View>
  );
}
