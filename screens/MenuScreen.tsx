import React from "react";
import Menu from "../components/MenuButtons";
import { View,ScrollView,Text} from "react-native";
import tw from "twrnc";


export default function MenuScreen(){
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
    </ScrollView>
</View>
    );
}