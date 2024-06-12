import React from 'react';
import { View, ScrollView,Button} from 'react-native';
import tw from 'twrnc';
import AdvisorCardWithText from '../components/AdvisorCardWithText';
import Freebuttons from '../components/Freebuttons';
import SideImageWithOverlay from '../components/SideImageOverlay';
import FilterButton from '../components/FilterButtons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type AdvisorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface AdvisorScreenProps {
  navigation: AdvisorScreenNavigationProp;
}

export default function InsightsScreen({ navigation }: AdvisorScreenProps) {
  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`p-2`}>
      <AdvisorCardWithText
        text='The following crops would do well in the {avg_temp} temperatures of {timedata.month}. These crops will also do well in {userdata.location()}'
      />
        <View style={tw`flex-row justify-between`}>
        <FilterButton
        label='A-Z'
        />
        <FilterButton
        label='Success Rate'
        />
        <FilterButton
        label='Price'
        />
        </View>
        <View style={tw`flex-row justify-between`}>
        <FilterButton
        label='Output'
        />
        <FilterButton
        label='Complexity'
        />
        </View>
      <View style={tw`h-full`}>
      <SideImageWithOverlay
        imageUrl='https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk='
        title='GINGER'
        smallerTitle='Chinese ginger'
        text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
      />
        <SideImageWithOverlay
        imageUrl='https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk='
        title='GINGER'
        smallerTitle='Chinese ginger'
        text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
      />
      <SideImageWithOverlay
        imageUrl='https://media.istockphoto.com/id/1449280400/photo/turmeric-tree-and-a-little-visible-trunk-on-the-ground-fresh-turmeric-photo.jpg?s=1024x1024&w=is&k=20&c=nYx3tWL2minHlcNmlIaLxHHzVXvxUCgrrd-dJfiSiFk='
        title='GINGER'
        smallerTitle='Chinese ginger'
        text={`success rate: 82%\nComplexity: 3/10 *the lower the easier\nOutput per acre: 6000-10000 kg\nprice per kg: 515.22 ksh`}
      />
      <Button
 title="FarmersPoint"
          onPress={() => navigation.navigate('FarmersPointScreen')}
        />      
      </View>
      </ScrollView>
    </View>
  );
}