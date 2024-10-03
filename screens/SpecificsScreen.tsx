import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import ImageWithOverlayNonclickable from "../components/imageCardNonclickable";
import JustText from "../components/JustText";
import NotificationPanel from "../components/Modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { useRoute, RouteProp } from "@react-navigation/native";

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
	const route = useRoute<RouteProp<RouteParams, "params">>();
	const { cropIndex, cropName } = route.params;
	const togglePanel = () => {
		setPanelVisible(!isPanelVisible);
	};
	return (
		<View style={tw`flex-1`}>
			<ScrollView contentContainerStyle={tw`items-center`}>
				<View style={tw`top-40`}>
					<ImageWithOverlayNonclickable
						image={cropName.replace(" ", "")}
						title={cropName}
						smallerTitle="(Anasal f1)"
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

					<View style={[tw`h-[40px] border justify-center p-3 w-[100%] m-1 rounded-3xl`, { borderColor: COLORS.ACCENT_COLOR }]}>
						<Text style={tw`text-center`}>Bookmark {cropName} for Another season</Text>
					</View>
				</View>
				<View>
					<JustText
						title="Tips"
						text="Field Selection: Consider the previous planted crop and observe at least a 3-season break from tomato, pepper, potato or any other crop from the solanaceous family to avoid disease cycles. Check the irrigation water quality and availability, particularly if you intend to use irrigation. The land should be gently sloping to facilitate drainage 1.
 Soil Environment: Tomatoes can grow in a variety of soil types but do best in well-drained, deep, uniform clay or silty loams. The soil should be loose, deep, and of the correct structure because Anna F1 has a root system of more than 60 cm depth. The optimum pH for tomato production is between 6-7.5 1.
 Land Preparation: Proper land preparation is necessary to loosen soil and break hard pans or compacted fields. During land preparation, 8 tons of farmyard manure per acre can be incorporated into the soil to improve its structure 1.
Seed Requirement: Anna F1 is sold in seed counts and is available in leading stockists in all regions of the country. A plant density of 3 plants per meter squared is recommended for most regions 1.
 Nursery Management: Anna F1 seeds can be grown either in a seedbed or in trays. If using a seedbed, plant the seeds 1 cm deep with 15 cm spacing between the rows 2.
 Germination: Anna F1 seeds take around 8 days to sprout 2.
 Transplanting: Transplant the seedlings when they are around 28 days old 2. For best results, transplant the seedlings in the evening when the weather is cool.
 Spacing: Anna F1 tomatoes require a spacing of between 45x60 cm and 60x60 cm depending on the number of stems/shoots you want your plant to have 2."
					/>
				</View>
				<NotificationPanel isVisible={isPanelVisible} cropName={cropName} onClose={togglePanel} />
			</ScrollView>
		</View>
	);
}
