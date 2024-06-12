import React from "react";
import InsightOverlay from "../components/Insights";
import { View,ScrollView,Text,Button} from "react-native";
import tw from "twrnc";
import AdvisorCardWithText from "../components/AdvisorCardWithText";
import Freebuttons from "../components/Freebuttons";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'
import JustText from "../components/JustText";
import ImageAndTextOnSide from "../components/ImageAndTextOnSide";


type InsightsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface InsightsScreenProps {
  navigation: InsightsScreenNavigationProp;
}

export default function InsightsScreen({ navigation }: InsightsScreenProps){
    return(
        <View style ={tw`flex-1 mb-1`}>
            <ScrollView contentContainerStyle={tw`bg-white items-center mb-1`}>
                <View style={tw`mb-0`}>    
                <AdvisorCardWithText
                text="Insights are carefully made for you
based on your location, current climate,
market and your personal preferences.
Learn more in user agreement"
                />  
                </View>
                <View style ={tw`mb-0`}>
            <InsightOverlay
            imageUrl="https://media.istockphoto.com/id/1344219758/photo/woman-emptying-food-waste-onto-garden-compost-heap.jpg?s=1024x1024&w=is&k=20&c=iDTv6jV3yEaHeEbUTJ7KmQP55tWgucryiFdXK5aLw2s="
            title="Learn how to make a quick compost pit with these steps"
            />
        </View>
        <View style={tw`flex-1`}>
            <JustText
            title="HOW TO MAKE YOUR VERY 
COMPOST PIT TODAY"
text="Composting is a great way to reduce waste and create nutrient-rich soil for your garden.One way to compost is by creating a compost pit. Here’s how to make one:
First, choose a location for your compost pit. Keep in mind that it will be visible, so choose a spot that’s out of the way or where you don’t mind seeing it. Next, dig the pit. It should be about 1 ft deep. Once you’ve dug the pit, level the bottom and mark the border.
Now it’s time to fill the pit with layers of carbon, nitrogen, and topsoil. Carbon-rich materials include things like dried leaves, straw, and paper. Nitrogen-rich materials include things like food scraps, grass clippings, and coffee grounds. Alternate layers of carbon and nitrogen materials until the pit is full.
Once the pit is full, turn the compost regularly to help it decompose faster. When the compost is ready, spread it around your garden to enrich the soil.
If you don’t want to dig a pit, you can also build a compost pile above ground. Simply scatter some twigs or straw on the ground to ensure aeration and drainage, then add layers of green and brown materials just like you would in a compost pit.
Composting is easy and rewarding. Give it a try and see how it can benefit your garden!"
/>
        </View>
        <View style={tw`right-25 top-15`}>
        <JustText
            title="More for you"
            text=""
          />
        </View>
        <View style={tw`mb-1`}>
            <ImageAndTextOnSide
            imageUrl="https://media.istockphoto.com/id/1408040779/photo/close-up-view-of-drip-irrigation-pipe-puring-water-into-the-plantation-in-the-orchard.webp?s=1024x1024&w=is&k=20&c=Cr85DUIduoUGeMBgrd4fOSr63ejZgkazbGVm2tX22P0="
            title="How to improve farming 
efficiency in small spaces
at almost zero costs!"
            date=""
            />

    <Button
 title="Go to Advisor"
          onPress={() => navigation.navigate('AdvisorScreen')}
        />
        </View>        
   </ScrollView>
</View>
);
}