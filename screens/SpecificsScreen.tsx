import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, ToastAndroid } from "react-native";
import tw from "twrnc";
import ImageWithOverlayNonclickable from "../components/imageCardNonclickable";
import JustText from "../components/JustText";
import NotificationPanel from "../components/Modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { useRoute, RouteProp } from "@react-navigation/native";
import { bookSeed } from "../db/update";
import { useAuth } from "../context/authContext";
import SignInSignUpModal from "../components/accountModal";
import AiResponse from "../components/aiRespose";


type SpecificsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface SpecificsScreenProps {
	navigation: SpecificsScreenNavigationProp;
}

type RouteParams = {
	params: {
		cropIndex: string;
		cropName: string;
	};
};

export default function SpecificsScreen({ navigation }: SpecificsScreenProps) {
	const [isPanelVisible, setPanelVisible] = useState(false);
	const [isAccountModalVisible, setAccountModalVisible] = useState(false);
	const route = useRoute<RouteProp<RouteParams, "params">>();
	const { cropIndex, cropName } = route.params;
	const { isLoggedIn, logout, checkLoginStatus, signup, signin, user, updateBookedSeedsContext } = useAuth();

	const togglePanel = () => {
		setPanelVisible(!isPanelVisible);
	};
	const toggleAccountModal = () => {
		setAccountModalVisible(!isAccountModalVisible);
	};

	const handleBookSeed = async () => {
		await checkLoginStatus();
		if (!user?.id) {
			console.log("User id", user?.id);
			toggleAccountModal();
			return;
		}
		const booked = await bookSeed(cropName, user.id);
		if (booked === "success") {
			await updateBookedSeedsContext();
			ToastAndroid.show(
				"Success! We've bookmarked this crop for you! You'll easily find it in your account.",
				ToastAndroid.LONG
			);
		} else {
			ToastAndroid.show(booked, ToastAndroid.SHORT);
		}
	};
	return (
		<View style={tw`flex-1`}>
			<ScrollView contentContainerStyle={tw`items-center`}>
				<View style={tw`w-100%`}>
					<ImageWithOverlayNonclickable
						image={cropName.replace(" ", "")}
						title={cropName}
						smallerTitle=""
						text="A red fruit and vegetable currently doing very well in internal and external markets"
					/>
				</View>
				<View style={tw`flex flex-col  w-[300px] my-5 justify-between`}>
					<TouchableOpacity onPress={togglePanel}>
						<View
							style={[
								tw`h-[40px] justify-center p-3 w-[100%] m-1 rounded-3xl`,
								{ backgroundColor: COLORS.ACCENT_COLOR },
							]}
						>
							<Text style={tw`text-center text-white`}>Plant {cropName} this season?</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleBookSeed}
						style={[tw`h-[40px] border justify-center p-3 w-[100%] m-1 rounded-3xl`, { borderColor: COLORS.ACCENT_COLOR }]}
					>
						<Text style={tw`text-center`}>Bookmark {cropName} for Another season</Text>
					</TouchableOpacity>
				</View>
					<View style={tw`p-4 w-[100%]`}>
						<AiResponse
						aiTextParam="## Hello Nyakach!!
Consider the previous planted crop and **observe at least a 3-season break** from **tomato, pepper, potato** or any other crop from the **solanaceous family** to avoid disease cycles. Check the **irrigation water quality** and availability, particularly if you intend to use irrigation. The land should be **gently sloping** to facilitate drainage.

## Soil Environment
Tomatoes can grow in a variety of soil types but do best in **well-drained, deep, uniform clay or silty loams**. The soil should be **loose, deep, and of the correct structure** because **Anna F1** has a root system of more than **60 cm depth**. The optimum **pH for tomato production** is between **6-7.5**.

## Land Preparation
Proper land preparation is necessary to **loosen soil** and **break hard pans** or compacted fields. During land preparation, **8 tons of farmyard manure** per acre can be incorporated into the soil to improve its structure.

## Seed Requirement
**Anna F1** is sold in seed counts and is available in leading stockists in all regions of the country. A **plant density of 3 plants per meter squared** is recommended for most regions.

## Nursery Management
**Anna F1 seeds** can be grown either in a seedbed or in trays. If using a seedbed, plant the seeds **1 cm deep** with **15 cm spacing** between the rows.

## Germination
**Anna F1 seeds** take around **8 days to sprout**.

## Transplanting
Transplant the seedlings when they are around **28 days old**. For best results, transplant the seedlings in the evening when the weather is cool.

## Spacing
**Anna F1 tomatoes** require a spacing of between **45x60 cm** and **60x60 cm** depending on the number of stems/shoots you want your plant to have.
"
						color="black"
					/>
						
					</View>
					
				<NotificationPanel isVisible={isPanelVisible} cropName={cropName} onClose={togglePanel} />
				<SignInSignUpModal isVisible={isAccountModalVisible} onClose={toggleAccountModal} />
			</ScrollView>
		</View>
	);
}
