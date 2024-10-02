// NotificationPanel.js
import React from "react";
import tw from "twrnc";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

interface NotificationPanelProps{
    isVisible: boolean;
    onClose: () => void;
}

const NotificationPanel = ({ isVisible, onClose }: NotificationPanelProps) => {
	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={onClose} // Dismiss on backdrop press
			swipeDirection="down"
			onSwipeComplete={onClose}
		>
			<View style={styles.panel}>
				<Text style={styles.title}>Will you be planting this crop this season?</Text>
				<Text>
					By saving this crop, we will be guiding you on what to do throughout the crop's development. This is particularly
					important if this is the first time you are planting this crop
				</Text>
				<View style={tw`flex flex-row justify-between my-[2rem]`}>
					<TouchableOpacity style={tw` bg-[#778B4C] h-15 rounded-3xl justify-center items-center w-[48%]`}>
						<Text style={[styles.buttonText, tw`text-white`]}>Save crop and acquire seeds </Text>
					</TouchableOpacity>
					<TouchableOpacity style={tw` bg-[white] border border-[#778B4C] h-15 rounded-3xl justify-center items-center w-[48%]`}>
						<Text style={styles.buttonText}>Only save crop </Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	panel: {
		backgroundColor: "white",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
        marginBottom: 20,
	},
	button: {
		marginTop: 20,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "#658A17",
		textAlign: "center",
	},
});

export default NotificationPanel;
