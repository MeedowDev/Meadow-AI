import React from 'react';
import { View, ScrollView,Text,TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import ImageWithOverlay from '../components/ImageCard';
import TwoButtonsSideBySide from '../components/TwoButtonsSideBySide';
import JustText from '../components/JustText';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type BookMarkedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface BookMarkedScreenProps {
  navigation: BookMarkedScreenNavigationProp;
}

export default function  BookMarkedScreen({ navigation }: BookMarkedScreenProps) {
    return(
        <View style={tw`flex-1 items-center`}>
            <ScrollView contentContainerStyle={tw`items-center`}>
            <View style={tw`top-40 mb-5`}>
            <ImageWithOverlay
                 imageUrl='https://media.istockphoto.com/id/171579643/photo/tomato-greenhouse.jpg?s=1024x1024&w=is&k=20&c=kFi-7YRjDfBTcPgSkCdppZVznCUHEfrU_mvjZii5UhI='
                 title='Tomatoes'
                 smallerTitle='(Anasal f1)'
                 text='A red fruit and vegetable currently doing very well in internal and external markets'
                onPress={() => navigation.navigate('BookMarkedScreen')}
          />
        </View>
                <View style={tw`flex-row justify-between `}>
                <View style={tw`mr-2`}>
        <TwoButtonsSideBySide title='Acquire Tomatoe seeds'/>
      </View>
      <View style={tw`ml-4`}>
        <TwoButtonsSideBySide title='Bookmark to acquire later'/>
      </View>
          </View>
                <View>
                <JustText
             title='WHY TOMATOES?'
             text='Tomatoes grow well in volcanic soil which is in your location
 Ideal altitudes are 1000-1900m, your location is {userdata.location(‘alt’)}m high
 Low humidities are prefered to prevent fungal diseases. The current season is has very low humidity
 Slightly windy consitions are preferred for good circulation. The current season has good wind speed'
             />
              <JustText
             title='Tips'
             text='Field Selection: Consider the previous planted crop and observe at least a 3-season break from tomato, pepper, potato or any other crop from the solanaceous family to avoid disease cycles. Check the irrigation water quality and availability, particularly if you intend to use irrigation. The land should be gently sloping to facilitate drainage 1.
 Soil Environment: Tomatoes can grow in a variety of soil types but do best in well-drained, deep, uniform clay or silty loams. The soil should be loose, deep, and of the correct structure because Anna F1 has a root system of more than 60 cm depth. The optimum pH for tomato production is between 6-7.5 1.
 Land Preparation: Proper land preparation is necessary to loosen soil and break hard pans or compacted fields. During land preparation, 8 tons of farmyard manure per acre can be incorporated into the soil to improve its structure 1.
Seed Requirement: Anna F1 is sold in seed counts and is available in leading stockists in all regions of the country. A plant density of 3 plants per meter squared is recommended for most regions 1.
 Nursery Management: Anna F1 seeds can be grown either in a seedbed or in trays. If using a seedbed, plant the seeds 1 cm deep with 15 cm spacing between the rows 2.
 Germination: Anna F1 seeds take around 8 days to sprout 2.
 Transplanting: Transplant the seedlings when they are around 28 days old 2. For best results, transplant the seedlings in the evening when the weather is cool.
 Spacing: Anna F1 tomatoes require a spacing of between 45x60 cm and 60x60 cm depending on the number of stems/shoots you want your plant to have 2.'
             />
                </View>
                <View style={tw`flex-row justify-around bg-white p-2 absolute bottom--2 w-full shadow-lg`}>
                <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home-outline" size={30} color="green" />
        <Text >Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AdvisorScreen')}
      >
        <Ionicons name="person-outline" size={30} color="green" />
        <Text >Advisory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
      >
        <Ionicons name="chatbubbles-outline" size={30} color="green" />
        <Text>Chat</Text>
      </TouchableOpacity>
                </View>              
            </ScrollView>            
        </View>
    );
}