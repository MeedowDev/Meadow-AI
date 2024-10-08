import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { useState,useEffect } from 'react';
import JustText from '../components/JustText';
import ImageAndTextOnSide from '../components/ImageAndTextOnSide';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import StackedVerticalCard from "../components/stackedVerticalCard";


type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface NewsScreenProps {
  navigation: NewsScreenNavigationProp;
}

export default function NewsScreen({ navigation }: NewsScreenProps) {

  const [newsData, setNewsData] = useState([]);

  
  const fetchNews = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
  
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us', {
        headers: {
          'Authorization': 'Bearer a33888f8b5194c279ece347e5faa2c66',
        },
        signal: controller.signal
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Data Response",data)
      setNewsData(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);
  

  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`bg-white `}>
      <View style={tw`h-[15rem] mx-4 flex-row`}>
      <View style={tw`w-full h-[110%]`}>
						<StackedVerticalCard
							image="farmerInTeaFarm"
							title="Stakeholders training"
							smallerTitle=""
							text="Stakeholders undergo training on reducing post harvest loses at Kaguru Agricultural center"
							onPress={() => navigation.navigate("NewsScreen")}
						/>
					</View>
      </View>
        <View style={tw`ml--2 p-4`}>
          <JustText
            title=''
            text='A stakeholders meeting was held at Kaguru, a small town located in the heart of the country. The meeting was attended by representatives from various organizations, including local government officials, business leaders, and community members. The purpose of the meeting was to discuss the development of the town and to address any concerns or issues that the stakeholders may have.
During the meeting, several topics were discussed, including the need for improved infrastructure, the creation of new jobs, and the promotion of tourism in the area. The stakeholders also discussed ways to attract new businesses to Kaguru and to support existing businesses in their growth and development.

The meeting was productive, with all parties expressing their commitment to working together to improve the town and its economy. Several action items were identified, including the formation of a task force to explore potential development opportunities and the creation of a marketing campaign to promote Kaguru as a desirable destination for tourists.
Overall, the stakeholders meeting at Kaguru was a success, with all parties coming together to discuss important issues and to work towards a common goal. The future of Kaguru looks bright, with many exciting developments on the horizon.'          />
        </View>

        <View style={tw`space-y-1 > * mb-4 p-4`}>
          <JustText
            title='Top Headlines'
            text=''
          />
          {newsData.slice(0, 3).map((article, index) => (
          <ImageAndTextOnSide
            key={index}
            imageUrl={article.urlToImage}
            title={article.title}
            date={new Date(article.publishedAt).toLocaleDateString()}
          />
        ))}
        </View>
      </ScrollView>
    </View>
  );
}
