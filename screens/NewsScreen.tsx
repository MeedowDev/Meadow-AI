import React from 'react';
import { View, ScrollView,TouchableOpacity,Text} from 'react-native';
import tw from 'twrnc';
import ImageWithOverlay from '../components/ImageCard';
import JustText from '../components/JustText';
import ImageAndTextOnSide from '../components/ImageAndTextOnSide';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface NewsScreenProps {
  navigation: NewsScreenNavigationProp;
}

export default function  NewsScreen({ navigation }: NewsScreenProps) {
  return (
    //i cannot get why the items center is the one holding the buttons at the bottom
    <View style ={tw`flex-1 items-center`}>
      <ScrollView contentContainerStyle={tw` p-2 bg-white`}>
        <View style={tw`mb--25 bottom-10 left-50`}>
        <TouchableOpacity
                  style={tw`p-10`}
                  onPress={() => navigation.navigate('Menu')}
                  >
        <Ionicons name="menu" size={50} color="green" />
        <Text style={tw`right-3`}></Text>
      </TouchableOpacity>
        </View>
        <View style={tw`top-40`}>
        <ImageWithOverlay
        imageUrl='https://media.istockphoto.com/id/1391769960/photo/happy-and-positive-african-farmer-on-his-banana-plantain-does-the-thumbs-up-with-his-hand.jpg?s=1024x1024&w=is&k=20&c=kZ4Yj6KnHk6gHM4JJ-a0RUQMO5mTPPJRIqsho0V0xpg='
        title='Stakeholders training'
        smallerTitle=''
        text='Stakeholders undergo training on reducing post harvest loses at Kaguru Agricultural center'
        />
        </View>
        <View style={tw`right-7`}>
        <JustText
            title=''
            text='A stakeholders meeting was held at Kaguru, a small town located in the heart of the country. The meeting was attended by representatives from various organizations, including local government officials, business leaders, and community members. The purpose of the meeting was to discuss the development of the town and to address any concerns or issues that the stakeholders may have.
During the meeting, several topics were discussed, including the need for improved infrastructure, the creation of new jobs, and the promotion of tourism in the area. The stakeholders also discussed ways to attract new businesses to Kaguru and to support existing businesses in their growth and development.

The meeting was productive, with all parties expressing their commitment to working together to improve the town and its economy. Several action items were identified, including the formation of a task force to explore potential development opportunities and the creation of a marketing campaign to promote Kaguru as a desirable destination for tourists.
Overall, the stakeholders meeting at Kaguru was a success, with all parties coming together to discuss important issues and to work towards a common goal. The future of Kaguru looks bright, with many exciting developments on the horizon.'
            />
  </View>
  <View style={tw`top-10 right-5`}>
      <JustText
          title='Happening in Kiambu'
          text=''/>
  </View>
  <View>
           <ImageAndTextOnSide
          imageUrl='https://media.istockphoto.com/id/1215107363/photo/close-up-of-beautiful-young-smiling-professional-black-african-business-woman-coworkers-hold.jpg?s=1024x1024&w=is&k=20&c=nDtlGNzXLs-ZU3GUlCUj6SCkt_c3hUyl37pJeskZS7A='
          title='Governor promises to 
Uplift education in the 
county'
          date='12-06-23 - Sunday'/>
           <ImageAndTextOnSide
          imageUrl='https://media.istockphoto.com/id/1464421361/photo/portrait-diversity-and-healthcare-team-smile-in-hospital-for-collaboration-support-and.jpg?s=1024x1024&w=is&k=20&c=92k1BSLzqL6WrLeTjwroj01pNoPYWW01-xjj8bM00LY='
          title='Cancer taskforce to 
begin public hearings
in Kiambu county'
          date='12-06-23 - Sunday'/>
           <ImageAndTextOnSide
          imageUrl='https://www.nairobileo.co.ke/storage/uploads/2023/04/FtM_9aZWcAE5Nso-1681012293.jpg'
          title='Coffee reforms take priority 
as DP Gachagua 
visits farms in Juja Farm'
          date='11-06-23 - Sunday'/>

  </View>
  <View style={tw`top-10 right-5`}> 
  <JustText
          title='Happening today'
          text=''/>
  </View>
  <View>
  <ImageAndTextOnSide
          imageUrl='https://media.istockphoto.com/id/532226067/photo/burning-van-with-large-flames-and-black-smoke.webp?s=1024x1024&w=is&k=20&c=W2CSduXegabke37a4pSDsR5cL1-fbIbjee2ISiwf-DE='
          title='Explosions rock Nairobi 
Hotel Kenya.
Attack claimed to be by 
Al shabab'
          date='11-06-23 - Sunday'/>
    </View>
    <View style={tw`flex-row mb--35 right-9 justify-between`}>
    <TouchableOpacity
        style={tw`p-10`}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={30} color="green" />
        <Text style={tw``}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`p-10 bg-current`}
        onPress={() => navigation.navigate('SpecificsScreen')}
      >
        <Ionicons name="document-attach" size={30} color="green" />
        <Text style={tw`right-2`}>Specifics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`p-10`}
        onPress={() => navigation.navigate('AdvisorScreen')}
      >
        <Ionicons name="person" size={30} color="green" />
        <Text style={tw`right-3`}>Advisory</Text>
      </TouchableOpacity>
    </View>
        </ScrollView>
    </View>
  );
}