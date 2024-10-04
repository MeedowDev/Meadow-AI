// NotificationPanel.js
import React, { useState } from "react";
import tw, { style } from "twrnc";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import Modal from "react-native-modal";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import { saveCrop } from "../db/update";

interface NotificationPanelProps {
	isVisible: boolean;
	cropName: string;
	onClose: () => void;
}

const NotificationPanel = ({ isVisible, cropName, onClose }: NotificationPanelProps) => {
	const { isLoggedIn, logout, signup, signin, checkLoginStatus, updateGrowingCropsContext, user } = useAuth();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [location, setLocation] = useState("");
	const [showLoginForm, setShowLoginForm] = useState(false); 
	const [action, setAction] = useState(""); // To store the action to be performed after login
	const [isSigningIn, setIsSigningIn] = useState(false);

	const navigation = useNavigation<any>();  

	const handleCheckLogin = async () => {
		await checkLoginStatus();
		if (isLoggedIn ) {
			console.log("User is logged in");
			navigation.navigate("MapScreen"); 

			return true;
		} else {
			console.log("User is not logged in");
			setShowLoginForm(true);
			return false
		}
	};

	const handleCropSave = async (navigate: boolean) => {
		await checkLoginStatus();
		if (!user?.id) {
			console.log("User id", user?.id);
			setShowLoginForm(true);
			return;
		}
		const registerCrop = await saveCrop(cropName, user.id);
		if (registerCrop === "success") {
			await updateGrowingCropsContext();
			ToastAndroid.show(
				"Success! We've registered youll be growing this crop! You will be receiving updates on how to grow it.",
				ToastAndroid.LONG
			);
			if (navigate) {
				navigation.navigate("MapScreen", { crop: cropName });
			}
		} else {
			ToastAndroid.show(registerCrop, ToastAndroid.SHORT);
		}
	}

	const handleSignup = async () => {
		await signup(username, email, location);
		setShowLoginForm(false); 
	};
	const closeForm = () => {
		setShowLoginForm(false);
	};


	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={() => {
				onClose();
				closeForm();
			}} // Dismiss on backdrop press
			swipeDirection="down"
			onSwipeComplete={() => {
				onClose();
				closeForm();
			}}
			animationIn="slideInUp" 
			animationOut="slideOutDown"
		>
			<View style={styles.panel}>
				<Text style={styles.title}>Will you be planting this crop this season?</Text>
				<Text>
					By saving this crop, we will be guiding you on what to do throughout the crop's development. This is particularly
					important if this is the first time you are planting this crop.
				</Text>

				{showLoginForm ? (
					<>
						<View>
							{isSigningIn ? (
								<>
									<Text style={[styles.title, tw`mt-4`]}>Please Login to {action}</Text>
									<View style={tw`flex flex-row mb-2`}>
										<Text>I case you dont have an account </Text>
										<TouchableOpacity onPress={() => setIsSigningIn(false)}>
											<Text style={tw`text-blue-600 underline`}>
												Click here to create your account
											</Text>
										</TouchableOpacity>
									</View>

									<TextInput
										style={styles.input}
										placeholder="Email"
										value={email}
										onChangeText={setEmail}
									/>

									<TouchableOpacity
										style={tw`bg-[#778B4C] h-15 rounded-3xl justify-center items-center my-3`}
										onPress={handleSignup}
									>
										<Text style={[styles.buttonText, tw`text-white`]}>
											Enter your account and complete action
										</Text>
									</TouchableOpacity>
								</>
							) : (
								<>
									<Text style={[styles.title, tw`mt-4`]}>Please Login to {action}</Text>
									<View style={tw`flex flex-row mb-2`}>
										<Text>Already have an account? </Text>
										<TouchableOpacity onPress={() => setIsSigningIn(true)}>
											<Text style={tw`text-blue-600 underline`}>
												Click here to login into your account
											</Text>
										</TouchableOpacity>
									</View>
									<TextInput
										style={styles.input}
										placeholder="Username"
										value={username}
										onChangeText={setUsername}
									/>
									<TextInput
										style={styles.input}
										placeholder="Email"
										value={email}
										onChangeText={setEmail}
									/>
									<TextInput
										style={styles.input}
										placeholder="Location "
										value={location}
										onChangeText={setLocation}
									/>
									<TouchableOpacity
										style={tw`bg-[#778B4C] h-15 rounded-3xl justify-center items-center my-3`}
										onPress={handleSignup}
									>
										<Text style={[styles.buttonText, tw`text-white`]}>
											Create a new account and complete action
										</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
					</>
				) : (
					<View style={tw`flex flex-row justify-between my-[2rem]`}>
						<TouchableOpacity
							style={tw`bg-[#778B4C] h-15 rounded-3xl justify-center items-center w-[48%]`}
							onPress={() => {
								setAction("save crop and acquire its seeds");
								handleCropSave(true);

							}}
						>
							<Text style={[styles.buttonText, tw`text-white`]}>Save crop and acquire seeds</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`bg-[white] border border-[#778B4C] h-15 rounded-3xl justify-center items-center w-[48%]`}
							onPress={() => {
								setAction("save the crop in your account");
								handleCropSave(false);
							}}
						>
							<Text style={styles.buttonText}>Only save crop</Text>
						</TouchableOpacity>
					</View>
				)}
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
	deactivateButton: {
		backgroundColor: "#FF0000",
	},
	buttonText: {
		color: "#658A17",
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
	},
});

export default NotificationPanel;
