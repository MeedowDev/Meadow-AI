import SQLite, { SQLiteDatabase,ResultSet} from 'react-native-sqlite-storage';
import React, { useEffect, useState,useCallback} from 'react';
import { User,createTable,getUsers,getDBConnection,saveUser } from '../components/DatabaseLocal';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc'; // Tailwind CSS import
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;


interface  AccountScreenProps {
	navigation: AccountScreenNavigationProp;
}

const AccountScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const loadUserData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);  // Ensure table is created
      const storedUsers = await getUsers(db);  // Get users from DB
      setUsers(storedUsers);
    } catch (error) {
      console.error('Error loading user data: ', error);
    }
  }, []);

  const addUser = async () => {
    if (!newName.trim() || !newContact.trim() || !newLocation.trim()) {
      Alert.alert('Error', 'All fields must be filled.');
      return;
    }

    try {
      const newUser: User = {
        id: users.length + 1,
        name: newName,
        contact: newContact,
        location: newLocation,
      };
      const db = await getDBConnection();
      await saveUser(db, newUser);
      setUsers([...users, newUser]);
      setNewName('');
      setNewContact('');
      setNewLocation('');
    } catch (error) {
      console.error('Error saving user: ', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <View style={tw`flex-1 items-center justify-center p-4 bg-white`}>
      {/* Input Fields and Save Button */}
      <TextInput
        placeholder='Enter your name'
        value={newName}
        onChangeText={setNewName}
        style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
      />
      <TextInput
        placeholder='Enter your contact'
        value={newContact}
        onChangeText={setNewContact}
        style={tw`w-full border border-gray-300 rounded-lg p-4 mb-4`}
        keyboardType='phone-pad'
      />
      <TextInput
        placeholder='Enter your location'
        value={newLocation}
        onChangeText={setNewLocation}
        style={tw`w-full border border-gray-300 rounded-lg p-4 mb-6`}
      />
      <TouchableOpacity
        onPress={addUser}
        style={tw`w-full bg-green-500 rounded-lg p-4`}
      >
        <Text style={tw`text-white text-center text-xl`}>Sign Up</Text>
      </TouchableOpacity>

      {/* Display Users */}
      <View style={tw`mt-6 w-full`}>
        {users.length > 0 ? (
          users.map((user) => (
            <View key={user.id} style={tw`border-b border-gray-300 py-4`}>
              <Text style={tw`text-lg`}>{user.name}</Text>
              <Text>{user.contact}</Text>
              <Text>{user.location}</Text>
            </View>
          ))
        ) : (
          <Text style={tw`text-lg text-center`}>No users available</Text>
        )}
      </View>
    </View>
  );
};

export default AccountScreen;
