import SQLite, { SQLiteDatabase, ResultSet } from "react-native-sqlite-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import tw from "twrnc"; // Tailwind CSS import
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useAuth } from "../context/authContext";
import { fetchAllUserData } from "../db/fetch";
import { COLORS } from "../constants/Colors";

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface AccountScreenProps {
	navigation: AccountScreenNavigationProp;
}

export default function AccountScreen({ navigation }: AccountScreenProps) {
	const { isLoggedIn, login, logout, checkLoginStatus, signup, signin } = useAuth();
	const [name, setName] = useState("");
	const [contact, setContact] = useState("");
	const [location, setLocation] = useState("");
	const [email, setEmail] = useState(""); // Replace with actual user data
	const [bookedCrops, setBookedCrops] = useState(["Corn", "Tomatoes", "Wheat"]); // Replace with actual data

	const handleUpdateDetails = () => {
		// Handle updating user details logic here
		console.log("Updated Details:", { name, email });
	};

	const handleUpdateLocation = () => {
		// Handle updating user location logic here
		console.log("Updated Location:", location);
	};

	const handleLogout =  () => {
		Alert.alert("Log out?", "We will retain your data and preferences", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "log out",
				onPress: async  () => {
					await logout();
				},
			},
		]);
	};

	const handleSignIn = async () => {
		try {
			await signin(email);
		} catch (error) {
			console.error("Login failed:", error);
		}
	}

	const handleSignUp = async () => {
		try {
			await signup(name, email, location);
		} catch (error) {
			console.error("Login failed:", error);
		}
	}
	const viewUsers = async () => {
		try {
			const users = await fetchAllUserData();
			console.log("Users data:", users);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}

	


	const handleDeleteAccount = () => {
		//! Not yet implemented
		Alert.alert("Delete Account", "Are you sure you want to delete your account? This action cannot be undone. Did you wish to log out instead?", [
			{ text: "Log out instead", onPress: () => handleLogout() },

			{ text: "Cancel", style: "cancel" },
			{ text: "Delete", onPress: () => console.log("Account deleted") },
		]);
	};

	return (
		<View style={tw`flex-1 items-center bg-white`}>
			{isLoggedIn ? (
				<ScrollView style={tw`flex-1 p-5 w-full bg-gray-100`}>
					<Text style={tw`text-2xl font-bold mb-5 text-center`}>Welcome to Your Farmer's Account!</Text>

					{/* Booked Crops Section */}
					<View style={tw`mb-5 p-5 bg-white rounded-lg shadow`}>
						<Text style={tw`text-xl font-semibold mb-3`}>Booked Crops</Text>
						{bookedCrops.length === 0 ? (
							<Text style={tw`text-gray-500`}>No crops booked yet.</Text>
						) : (
							bookedCrops.map((crop, index) => (
								<View
									key={index}
									style={tw`flex flex-row justify-between items-center py-2 border-b border-gray-200`}
								>
									<Text style={tw`text-lg`}>{crop}</Text>
									{/* TODO: Add a remove crop button */}
									<TouchableOpacity
										style={[tw` px-4 py-2 rounded-lg`, { backgroundColor: COLORS.ACCENT_COLOR }]}
									>
										<Text style={tw`text-white`}>Acquire Seeds</Text>
									</TouchableOpacity>
								</View>
							))
						)}
					</View>

					{/* Farm Location Section */}
					<View style={tw`mb-5 p-5 bg-white rounded-lg shadow`}>
						<Text style={tw`text-xl font-semibold mb-3`}>Farm Location</Text>
						<Text style={tw`text-lg text-gray-500 mb-2`}>Kalimoni, Juja</Text>
						<TextInput
							style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-3`}
							value={location}
							onChangeText={setLocation}
							placeholder="Change your farm location"
						/>
						<TouchableOpacity style={tw`bg-blue-500 px-4 py-3 rounded-lg`} onPress={handleUpdateLocation}>
							<Text style={tw`text-white text-center`}>Update Location</Text>
						</TouchableOpacity>
					</View>

					{/* User Details Section */}
					<View style={tw`mb-5 p-5 bg-white rounded-lg shadow`}>
						<Text style={tw`text-xl font-semibold mb-3`}>Your Details</Text>
						<Text style={tw`text-lg text-gray-500 mb-2`}>Name: Farmer's Name</Text>
						<TextInput
							style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-3`}
							value={name}
							onChangeText={setName}
							placeholder="Not your name? Change it here"
						/>
						<Text style={tw`text-lg text-gray-500 mb-2`}>Email: Farmer@happylife.com</Text>
						<TextInput
							style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-3`}
							value={email}
							onChangeText={setEmail}
							placeholder="Incorrect email? Change it here"
							keyboardType="email-address"
						/>
						<TouchableOpacity style={tw`bg-blue-500 px-4 py-3 rounded-lg`} onPress={handleUpdateDetails}>
							<Text style={tw`text-white text-center`}>Update Details</Text>
						</TouchableOpacity>
					</View>
					<View style={tw`mt-10 p-5 bg-white rounded-lg shadow mb-[4rem]`}>
						<Text style={tw`text-xl font-semibold mb-3`}>Account Management</Text>

						<TouchableOpacity style={tw`bg-gray-500 px-4 py-3 rounded-lg mb-3`} onPress={handleLogout}>
							<Text style={tw`text-white text-center`}>Create a new account</Text>
						</TouchableOpacity>
						{/* Log Out Button */}
						<TouchableOpacity style={tw`bg-gray-500 px-4 py-3 rounded-lg mb-3`} onPress={handleLogout}>
							<Text style={tw`text-white text-center`}>Log Out</Text>
						</TouchableOpacity>

						{/* Delete Account Button */}
						<TouchableOpacity style={tw`bg-gray-500 px-4 py-3 rounded-lg`} onPress={handleDeleteAccount}>
							<Text style={tw`text-white text-center`}>Delete Account</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			) : (
				<View style={tw`flex-1 items-center w-full justify-center p-5 bg-white`}>
					<Text style={tw`text-2xl font-semibold text-center mb-6`}>Welcome to ClevaEnergy</Text>

					<TextInput
						placeholder="Enter your name"
						value={name}
						onChangeText={setName}
						style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
					/>

					<TextInput
						placeholder="Enter your email"
						value={email}
						onChangeText={setEmail}
						style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
						keyboardType="email-address"
					/>

					<TextInput
						placeholder="Enter your location"
						value={location}
						onChangeText={setLocation}
						style={tw`w-full border border-gray-300 rounded-lg p-4 mb-6`}
					/>

					<TouchableOpacity style={tw`w-full bg-green-500 rounded-lg p-4`} onPress={viewUsers}>
						<Text style={tw`text-white text-center text-xl`}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
