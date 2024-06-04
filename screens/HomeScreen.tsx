import React from "react";
import { Image, View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import { FONTS } from "../constants/Fonts";
import {
  LARGE_CONTAINER_STYLING,
  TOP_PADDING,
} from "../constants/ContainersStyling";
import AccountInfo from "../components/AccountInfo";
import FarmersOverlay from "../components/FarmersPoint";
import ImageAndTextOnSide from "../components/ImageAndTextOnSide";
import InsightOverlay from "../components/Insights";
import HowTo from "../components/HowTo";
import Menu from "../components/MenuButtons";
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClickableButtons from "../components/ClickableButtons";
export default function HomeScreen() {
  return (
    <View style ={tw`flex-row`}>
        <ScrollView contentContainerStyle={tw`bg-white items-center`}>
          <View>
        <ClickableButtons
        title="Acquire Tomato seeds"
        />
        </View>
    </ScrollView>
    </View>
  );
}
