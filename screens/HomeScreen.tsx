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

export default function HomeScreen() {
  return (
    <View style ={tw`flex-row`}>
        <ScrollView contentContainerStyle={tw`bg-white items-center`}>
          <View>
        <ImageAndTextOnSide
        imageUrl="https://media.istockphoto.com/id/946180652/photo/school-class-in-the-north-of-zanzibar-tanzania-an-ordinary-classroom-in-an-african-school.jpg?s=1024x1024&w=is&k=20&c=FoAv7BVH8z1GUVh9XlJSbW9bbD-bXM9HXDZCbjt2Kxo="
        title="Governor promises to 
        Uplift education in the 
        county"
        date="4-06-2024   -Wednesday"
        />
         <ImageAndTextOnSide
        imageUrl="https://media.istockphoto.com/id/1468520185/photo/teamwork-planning-and-meeting-with-doctors-and-laptop-for-medical-review-and-healthcare.jpg?s=1024x1024&w=is&k=20&c=FOOBINn1HvhhS7gORkObVCUZ4PN97Qfv80vL-yXE8tg="
        title="Cancer taskforce to 
        begin public hearings
        in Meru county"
        date="9-05-2024   -Monday"
        />
        <ImageAndTextOnSide
        imageUrl="https://theinformer.co.ke/wp-content/uploads/2023/04/Rigathi-in-Ihwagi.jpg"
        title="Coffee reforms take priority 
        in Kirinyaga as Gachagua 
        visits farms in North Kivingo"
        date="14-03-2024   -Saturday"
        />
        </View>
    </ScrollView>
    </View>
  );
}
