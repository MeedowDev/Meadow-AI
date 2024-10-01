import SQLite, { SQLiteDatabase,ResultSet} from 'react-native-sqlite-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc'; // Tailwind CSS import
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;


interface  AccountScreenProps {
	navigation: AccountScreenNavigationProp;
}

export default function AccountScreen({ navigation }: AccountScreenProps) {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState('');

    // Function to open the database
    const openDatabase = async () => {
        const db = await SQLite.openDatabase({ name: 'myDatabase.db', location: 'default' });
        return db;
    };

    // Initialize database and create table
    const initDb = async () => {
        const db = await openDatabase();
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Contact TEXT, Location TEXT);',
                [],
                () => {
                    console.log('Table created successfully');
                },
                error => {
                    console.log('Error creating table', error);
                }
            );
        });
    };

    // Call initDb when component mounts
    useEffect(() => {
        initDb();
    }, []);

    const handleSignUp = async () => {
        if (name.length === 0 || contact.length === 0 || location.length === 0) {
            Alert.alert('Warning!', 'Please fill all fields.');
            return;
        }

        const db = await openDatabase();
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Users (Name, Contact, Location) VALUES (?, ?, ?)',
                [name, contact, location],
                () => {
                    Alert.alert('Success!', 'Your data has been saved.');
                    // Optionally navigate to another screen
                    // navigation.navigate('SomeOtherScreen');
                },
                error => {
                    console.log('Error saving data', error);
                }
            );
        });
    };

    return (
      <View style={tw`flex-1 items-center justify-center p-4 bg-white`}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1600013227786-329ab1958371?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }} // Replace with your image URL
          style={tw`w-30 h-0 mb-6 rounded-full`}
          resizeMode='cover'
        />
        <Text style={tw`text-2xl font-semibold text-center mb-6`}>Welcome back</Text>
  
        <TextInput
          placeholder='Enter your name'
          value={name}
          onChangeText={setName}
          style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
        />
  
        <TextInput
          placeholder='Enter your contact'
          value={contact}
          onChangeText={setContact}
          style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
          keyboardType='phone-pad'
        />
  
        <TextInput
          placeholder='Enter your location'
          value={location}
          onChangeText={setLocation}
          style={tw`w-full border border-gray-300 rounded-lg p-4 mb-6`}
        />
  
        <TouchableOpacity
          onPress={handleSignUp}
          style={tw`w-full bg-green-500 rounded-lg p-4`}
        >
          <Text style={tw`text-white text-center text-xl`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
} 