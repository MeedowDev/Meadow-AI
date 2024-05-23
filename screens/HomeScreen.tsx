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
import Menu from "../components/MenuButtons";
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  return (
    <View style={tw`bg-white relative`}>
          <ScrollView contentContainerStyle={tw`bg-white items-center`}>
        <Menu
        title={"Home"}
        />
        <Menu
        title={"Advisor"}
        />
        <Menu
        title={"farmers point"}
        />
        <Menu
        title={"News"}
        />
        <Menu
        title={"farming insights"}
        />
    </ScrollView>
  </View>
  );
}
