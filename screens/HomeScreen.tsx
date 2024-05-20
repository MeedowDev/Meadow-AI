import React from "react";
import {Image, View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import {FONTS} from "../constants/Fonts";
import { LARGE_CONTAINER_STYLING , TOP_PADDING } from "../constants/ContainersStyling";
import ImageWithOverlay from "../components/ImageCard";
import SideImageWithOverlay from "../components/SideImageOverlay";
import { Icon } from "@chakra-ui/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={tw`bg-white items-center`}>
			<View style={tw`flex-row justify-center w-30 p-5 top-5`}>
            <Text>The dimensions</Text>
          </View>
			<SideImageWithOverlay
		  imageUrl={
			"https://images.unsplash.com/photo-1635847163737-c93e3d73bcc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			}
			title={"POTATOES"}
			smallerTitle={"(hey! i am not here)"}
			text={`Success rate: 60%
Complexity: 1/10*the lower the easier
Output per acre: 13000 kg  
Rice per kg: 108.93 ksh`}
		  	/>
			<SideImageWithOverlay
		  imageUrl={
			"https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			}
			title={"TOMATOES"}
		smallerTitle={"(hey! i am not here)"}
			text={`Success rate: 60%
Complexity: 1/10*the lower the easier
Output per acre: 13000 kg  
Rice per kg: 108.93 ksh`}
		  	/>
		<SideImageWithOverlay
		  imageUrl={
			"https://images.unsplash.com/photo-1635008388183-04ea0313c5d1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			}
			title={"GINGER"}
		smallerTitle={"(hey! i am not here)"}
			text={`Success rate: 60%
Complexity: 1/10*the lower the easier
Output per acre: 13000 kg  
Rice per kg: 108.93 ksh`}
		  	/>					
		</ScrollView>
	);
}

