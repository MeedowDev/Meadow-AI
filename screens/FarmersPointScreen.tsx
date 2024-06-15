import React from 'react';
import { View, ScrollView,Text,TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import FarmersOverlay from '../components/FarmersPoint';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type FarmersPointScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface FarmersPointScreenProps {
  navigation: FarmersPointScreenNavigationProp;
}

export default function FarmersPointScreen({ navigation }: FarmersPointScreenProps) {
  return (
    <View style ={tw`flex-1`}>
      <ScrollView style={tw`p-4`}>
        {/* <FarmersOverlay
        text='My avocadoes are dying😭😭😭Someone please help
I have literally tried everything, I have
been generous with firtilizer and water
sasa hizi ni gani😢'
        timeLine='12:04 PM - Friday'
        imageUrl='https://media.istockphoto.com/id/956055962/photo/cute-a-small-child-bitterly-cries-close-up.jpg?s=1024x1024&w=is&k=20&c=A8Extha8yzz-sRoshhheD4HiTHe61V_usyEOHoHzKGo='
        index={1}
        name='Njoro Wa Shamba'
        footer='reply Njoroge Bruno'
        /> */}
      {/* <TouchableOpacity
        style={tw`left-23`}
        onPress={() => navigation.navigate('FarmersPointScreen')}
      >
        <Ionicons name="person" size={30} color="green" />
        <Text style={tw`right-3`}>Farmers</Text>
      </TouchableOpacity> */}
      <Text>This page is currently under construction!!!</Text>
      </ScrollView>
    </View>
  );
}