import ImageWithOverlay from "../components/ImageCard";
import InsightOverlay from "../components/Insights";
import CardWithText from "../components/CardWithText";
import EmptyCard from "../components/EmptyCard";
import Freebuttons from "../components/Freebuttons";
import JustText from "../components/JustText";
import { View,ScrollView,Text} from "react-native";
import tw from "twrnc";
import { FONTS } from "../constants/Fonts";

export default function HomeScreen() {
  return (
    <View style ={tw`flex-row`}>
        <ScrollView contentContainerStyle={tw`bg-white items-center`}>
          <View>
          <CardWithText
            title="Season"
            title2="Today"
            text="16°C-31°C"
            text2="Cold/Dry"
            />
          </View>
          <View>
        <EmptyCard
        title="Book marked"
        text="Avocados:"
        smallerText="Hass avoca..."
        text2="Tomatoes:"
        smallerText2=" Anasal f1 h..."
        />
        <Freebuttons
        title="OPEN"/>
        <Freebuttons
        title="OPEN"/>
        </View>
        <View>
          <ImageWithOverlay
          imageUrl="https://images.unsplash.com/photo-1539519532614-723937382b86?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Farming Advisor"
          text="Get immediate expert advice on what to plant this season for free!"
          />
          <ImageWithOverlay
          imageUrl="https://media.istockphoto.com/id/479440915/photo/compost-with-composted-earth.webp?s=1024x1024&w=is&k=20&c=2jrCMGulru42bQVUDgvHZXSS9AI_ssd1yIKwrCaZkOQ="
          title="Farming Insight"
          text="Learn how to make a quick compost pit with these steps"
          />
        </View>
        <View>
          <JustText
            title="Meru News"
          />
          <ImageWithOverlay
            imageUrl="https://media.istockphoto.com/id/1713057083/photo/happy-orchard-owners-during-autumn-harvest-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=TY7XBRJbiBkstk1CEpeeX1c-sVWWxuHHHVW8Bg4T3Sg="
            title="Stakeholders training" 
            text="Stakeholders undergo training on reducing post harvest loses at Kaguru Agricultural center"
          />
        </View>
    </ScrollView>
    </View>
  );
}