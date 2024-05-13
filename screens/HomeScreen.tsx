import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import {FONTS} from "../constants/Fonts";
import { LARGE_CONTAINER_STYLING , TOP_PADDING } from "../constants/ContainersStyling";
import ImageWithOverlay from "../components/ImageCard";

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={tw`bg-white items-center`}>
			<View>
				<Text style={TOP_PADDING}>Device padding</Text>
			</View>
			<ImageWithOverlay
				imageUrl={
					"https://images.unsplash.com/photo-1715077802063-27bdf4f6f99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8"
				}
				title={"This is a title"}
				text={"This is a text"}
			/>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING}>
				<Text style={FONTS.LARGE_TITLE}>The is LARGE TITLE</Text>
				<Text style={FONTS.GREEN_TITLE}>This is GREEN TITLE </Text>
				<Text style={FONTS.REGULAR_BOLD_FONT}>This is REGULAR BOLD FONT</Text>
				<Text style={FONTS.HIGHLIGHTED_TEXT_FONT}>This is HIGHLIGHTED FONT</Text>
				<Text style={FONTS.REGULAR_FONT}>This is REGULAR FONT</Text>
			</View>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_STYLING}></View>
			<ImageWithOverlay
				imageUrl={
					"https://images.unsplash.com/photo-1715077802063-27bdf4f6f99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8"
				}
				title={"This is a title"}
				text={"This is a text"}
			/>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING}></View>
		</ScrollView>
	);
}
