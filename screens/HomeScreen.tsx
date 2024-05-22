import React from "react";
import { Image, View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import { FONTS } from "../constants/Fonts";
import {
  LARGE_CONTAINER_STYLING,
  TOP_PADDING,
} from "../constants/ContainersStyling";
import ImageWithOverlay from "../components/ImageCard";
import SideImageWithOverlay from "../components/SideImageOverlay";
import FarmersOverlay from "../components/FarmersPoint";
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  return (
    <View style={tw`bg-white relative`}>
          <ScrollView contentContainerStyle={tw`bg-white items-center`}>
        {/* Horizontal line connecting the top two containers */}
        <View style={{ position: 'absolute', top: '20%', left: '2%', backgroundColor: 'green', width: 1, height: '60%' }} />
        {/* Vertical line connecting the top container to the bottom two containers */}
        <View style={{ position: 'absolute', top: '80%', left: '2%', backgroundColor: 'green', width: '5%', height: 1 }} />
        <View style={{ position: 'absolute', top: '50%', left: '2%', backgroundColor: 'green', width: '5%', height: 1 }} />

        <FarmersOverlay
          imageUrl={
            "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          name={"Njoro wa uba"}
          timeLine={"12:04 PM - Friday"}
          text={"mimi kama a farmer nimehuzunika 😭😭😭 na fertilizer tumepata jamani ni mawe na mimea wangu wanakufa.. kutaendaje?"}
          footer={"Reply to Njoro"}
          index={0}
        />
        <FarmersOverlay
          imageUrl={
            "https://plus.unsplash.com/premium_photo-1679063630153-f338c6ceb0c0?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          name={"Chomba Kivinga"}
          timeLine={"1:04 PM - Tuesday"}
          text={
            "I have literally tried everything,  the way things are supposed to be done.Hata fatalaiza nimenunua na kila kitu nimefanya lakini shamba wueeh.. saidieni "
          }
          footer={"Reply to Chomba"}
          index={1}
        />
      <FarmersOverlay
        imageUrl={
          "https://media.istockphoto.com/id/1470170589/photo/male-hands-touching-soil-and-checks-quality-of-soil-before-sowing.jpg?s=2048x2048&w=is&k=20&c=9R3ybDzciyfHnexusyfYqV-pk5FBrJJQG5QCa9Ip-gE="
        }
        name={"Rabai Kyalo"}
        timeLine={"8:04 PM - Thursday"}
        text={
          "and yeah the farmers view is very important to me and to everyone who is concerned about the weather and climate and the effect of good planning for your farm"
        }
        footer={"Reply to Rabai Kyalo"}
        index={2}
      />
    </ScrollView>
  </View>
  );
}
