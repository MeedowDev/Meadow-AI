import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import tw from "twrnc";

//constants
import { FONTS } from "../constants/Fonts";
import { LARGE_CONTAINER_STYLING, TOP_PADDING } from "../constants/ContainersStyling";
import ImageWithOverlay from "../components/ImageCard";

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={tw`bg-white items-center`}>
			<View>
				<Text style={TOP_PADDING}>Device padding</Text>
			</View>
			<ImageWithOverlay
				imageUrl={{
					localImage: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8NDA0JTIwZXJyb3J8ZW58MHx8MHx8fDA%3D",
					onlineImage:
						"https://img.frepik.com/free-photo/happy-cheerful-african-american-farm-worker-holding-crate-full-local-eco-friendly-ripe-leafy-greens-from-sustainable-crop-harvest-entrepreneurial-bio-permaculture-greenhouse-farm_482257-64585.jpg?t=st=1715698450~exp=1715702050~hmac=712ac2c1757f88cef4c5d466f6ec21483e0fcb7b24a357f70f8e14eb551d363d&w=1060",
				}}
				title={"tomatoes"}
				titleSubtext={"anasal fi"}
				text={"A red fruit and vegetable currently doing very well in internal and external markets"}
			/>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_CONTENT_CONTAINER_STYLING}>
				<Text>Hello oworld</Text>
			</View>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING}>
				
			</View>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_CONTENT_CONTAINER_STYLING}></View>
			<View style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING}></View>
		</ScrollView>
	);
}
