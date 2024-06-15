import React from "react";
import Menu from "../components/MenuButtons";
import { View,ScrollView,Text,Button} from "react-native";
import tw from "twrnc";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
}
export default function MenuScreen({ navigation }: MenuScreenProps){
    return(
        <View style ={tw`flex-1`}>
            <ScrollView contentContainerStyle={tw`bg-white items-center`}>
            <Menu
            title="Menu"
            />
            <Menu
            title="Advisor"
            />
            <Menu
            title="farmers point"
            />
            <Menu
            title="News"
            />
            <Menu
            title="farming insights"
            />
      <View style={tw`top-10`}>
      <Button
          title="Go to Insights"
          onPress={() => navigation.navigate('Insights')}
        />
      </View>
    </ScrollView>
</View>
    );
}