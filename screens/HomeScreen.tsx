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
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  return (
    <View style={tw`bg-white relative`}>
          <ScrollView contentContainerStyle={tw`bg-white items-center`}>
        <InsightOverlay
          imageUrl={
            "https://media.istockphoto.com/id/1423388554/photo/fertile-soil-background-for-environmental-theme.jpg?s=1024x1024&w=is&k=20&c=HHOYRxtomLHcHfg5mcCgdOMz9Pf9NeXPOdEA22QGob8="
          }
          title={`Learn how to make a quick 
compost pit with these steps`}
        />
        <View
        style={[LARGE_CONTAINER_STYLING.SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHT]}
        >
          <Text style={[FONTS.SNOW_TITLE_INSIGHTS, {marginTop: 15, marginLeft: 30}]}>HOW TO MAKE YOUR VERY 
COMPOST PIT TODAY</Text>
      <Text style={[FONTS.REGULAR_FONT,{marginTop: 1, marginLeft:20}]}>Composting is a great way to reduce waste and create nutrient-rich soil for your garden. One way to compost is by creating a compost pit. Here’s how to make one:                                                                                            First, choose a location for your compost pit. Keep in mind that it will be visible, so choose a spot that’s out of the way or where you don’t mind seeing it. Next, dig the pit. It should be about 1 ft deep. Once you’ve dug the pit, level the bottom and mark the border.
Now it’s time to fill the pit with layers of carbon, nitrogen, and topsoil. Carbon-rich materials include things like dried leaves, straw, and paper. Nitrogen-rich materials include things like food scraps, grass clippings, and coffee grounds. Alternate layers of carbon and nitrogen materials until the pit is full.
Once the pit is full, turn the compost regularly to help it decompose faster. When the compost is ready, spread it around your garden to enrich the soil.
If you don’t want to dig a pit, you can also build a compost pile above ground. Simply scatter some twigs or straw on the ground to ensure aeration and drainage, then add layers of green and brown materials just like you would in a compost pit.
Composting is easy and rewarding. Give it a try and see how it can benefit your garden!</Text>
        </View>
    </ScrollView>
  </View>
  );
}
