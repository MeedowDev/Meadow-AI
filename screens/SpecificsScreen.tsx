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
			ToastAndroid.show("Success! We've bookmarked this crop for you! You'll easily find it in your account.", ToastAndroid.LONG);
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
						title={cropName.includes("_") ? cropName.split("_")[0] : cropName}
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
							<Text style={tw`text-center text-white`}>
								Plant {cropName.includes("_") ? cropName.split("_")[0] : cropName} this season?
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleBookSeed}
						style={[tw`h-[40px] border justify-center p-3 w-[100%] m-1 rounded-3xl`, { borderColor: COLORS.ACCENT_COLOR }]}
					>
						<Text style={tw`text-center`}>
							Bookmark {cropName.includes("_") ? cropName.split("_")[0] : cropName} for Another season
						</Text>
					</TouchableOpacity>
				</View>
				<View style={tw`p-4 w-[100%]`}>
					<AiResponse
						aiTextParam="### Why Plant **JL24 Groundnuts** in Juja?

1. **Short Growing Period**  
   JL24 is known for its short maturity period (approximately 90-100 days), which makes it well-suited for regions with unpredictable weather patterns. Juja, with its moderate rainfall and warm temperatures, provides an ideal growing environment for quick-maturing crops like JL24.

2. **Drought Resistance**  
   Though Juja has a bimodal rainfall pattern, groundnuts like JL24 can tolerate periods of low rainfall. They thrive in areas with well-drained, sandy loam soils, which are common in Juja. This makes JL24 a good option for farmers wanting to reduce water stress risks.

3. **High Yield Potential**  
   JL24 is known for its high productivity under favorable conditions. When properly managed in Juja’s climate, this variety can yield a significant number of pods per plant, maximizing profitability per hectare.

4. **Good Market Demand**  
   Groundnuts have a strong market demand in Kenya for both domestic consumption and export. JL24’s high oil content and attractive kernel size make it especially appealing for oil production and direct consumption, ensuring good sales potential for Juja farmers.

### Risks to Watch Out For

1. **Aflatoxin Contamination**  
   Groundnuts are prone to aflatoxin contamination, especially in humid conditions. To minimize this risk in Juja, ensure proper drying of the nuts after harvesting and store them in a cool, dry place to prevent fungal growth.

2. **Pests and Diseases**  
   JL24 groundnuts can be susceptible to pests like aphids and diseases such as groundnut rosette virus. Be vigilant for yellowing leaves and stunted growth. Regular inspection and timely application of organic pesticides can help keep these issues under control.

3. **Excessive Rainfall**  
   While JL24 is drought-tolerant, excessive moisture during flowering and pod development can lead to poor yields and fungal infections. In Juja, monitor the weather closely during these critical growth stages, and ensure proper drainage in the fields to avoid waterlogging.

4. **Soil Nutrient Depletion**  
   Groundnuts fix nitrogen in the soil, but they also deplete other important nutrients like phosphorus and potassium. Continuous cultivation without replenishing the soil can lead to lower yields over time. Use crop rotation strategies and organic compost to maintain soil fertility.

Plant JL24 groundnuts in well-drained soil, with attention to these risks, and they will perform well in Juja's climate!
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
