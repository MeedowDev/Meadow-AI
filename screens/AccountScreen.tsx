import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { openDatabase, createTable, insertUser } from '../components/DatabaseLocal'; // Adjust the import path as needed
import tw from 'twrnc';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export default function AccountScreen() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [dbInstance, setDbInstance] = useState<SQLiteDatabase | null>(null); // Store the database instance
  const [isDbReady, setIsDbReady] = useState(false); // Initially set to false

  // Ensure the database is initialized and the table is created when the component mounts
  useEffect(() => {
    const initDatabase = async () => {
      try {
        console.log('Initializing database...');
        const db = await openDatabase(); // Open the database
        if (db) {
          setDbInstance(db); // Set the db instance in state
          await createTable(db); // Create the table using the db instance
          console.log('Table created successfully');
          setIsDbReady(true); // Set database as ready only after the table is created
        } else {
          console.error('Database instance is null after openDatabase');
        }
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };
    initDatabase(); // Initialize the database on component mount
  }, []);

  const handleSignUp = async () => {
    if (!isDbReady) {
      console.error('Database is not ready yet');
      return;
    }

    if (name && contact && location) {
      try {
        if (dbInstance) {
          await insertUser(dbInstance, name, contact, location); // Insert user using the db instance
          console.log('User inserted successfully');
        } else {
          console.error('Database instance is null');
        }
      } catch (error) {
        console.error('Failed to insert user:', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
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
        disabled={!isDbReady} // Disable the button until the database is ready
      >
        <Text style={tw`text-white text-center text-xl`}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}