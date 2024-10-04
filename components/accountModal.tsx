import React, { useState } from "react";
import tw from "twrnc";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

interface SignInSignUpModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const SignInSignUpModal = ({ isVisible, onClose }: SignInSignUpModalProps) => {
	const { signup, signin } = useAuth();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [location, setLocation] = useState("");
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigation = useNavigation<any>();

	const handleSignup = async () => {
		setLoading(true);
		setErrorMessage("");
		try {
			await signup(username, email, location);
			onClose();
			navigation.navigate("MapScreen"); // Redirect after signup
		} catch (error) {
			setErrorMessage("Signup failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleSignin = async () => {
		setLoading(true);
		setErrorMessage("");
		try {
			const success = await signin(email);
			if (success) {
				onClose();
			} else {
				setErrorMessage("Login failed. Please check your credentials.");
			}
		} catch (error) {
			setErrorMessage("Login failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={onClose} // Dismiss on backdrop press
			swipeDirection="down"
			onSwipeComplete={onClose}
			animationIn="slideInUp"
			animationOut="slideOutDown"
		>
			<View style={styles.panel}>
				<Text style={styles.title}>
					{isSigningIn ? "Please login to your account to proceed" : "Please create an account to proceed"}
				</Text>
				<View style={tw`flex flex-row mb-2`}>
					<Text>{isSigningIn ? "Don't have an account?" : "Already have an account?"}</Text>
					<TouchableOpacity onPress={() => setIsSigningIn(!isSigningIn)}>
						<Text style={tw`text-blue-600 underline`}>
							{isSigningIn ? " Click to create your account" : " Log in to your account"}
						</Text>
					</TouchableOpacity>
				</View>
				{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
				{isSigningIn ? (
					<>
						<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
					</>
				) : (
					<>
						<TextInput
							style={styles.input}
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
							editable={!isSigningIn} // Only allow username input during signup
						/>
						<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
						<TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
					</>
				)}

				<TouchableOpacity
					style={tw`bg-[#778B4C] h-15 rounded-3xl justify-center items-center my-3`}
					onPress={isSigningIn ? handleSignin : handleSignup}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={[styles.buttonText, tw`text-white`]}>{isSigningIn ? "Login" : "Create Account"}</Text>
					)}
				</TouchableOpacity>
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
	errorText: {
		color: "red",
		marginBottom: 10,
	},
	buttonText: {
		color: "#fff",
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

export default SignInSignUpModal;
