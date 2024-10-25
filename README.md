  <p align="center">
  <img src="https://github.com/user-attachments/assets/e77de4c7-3492-4267-99af-024d2c723202" alt="Meadow AI project header" style="border-radius: 13;"/>

</p>

# Meadow Project Overview

## 🌍 The Issue We Are Hoping to Solve
In underprivileged communities worldwide, small-scale farmers face inequitable access to crucial agricultural information, leading them to plant the same crops simultaneously. This oversaturation every harvest season drives prices down, and traps farmers in a cycle of poverty.

### 💡 How our technology solution can help
Our solution utilizies AI to ensure equitable access to vital agricultural information

## 🌿 Our Idea
Meadow AI focuses on the `equitable access to agricultural information` — a critical need for sustainable farming and economic resilience. Meadow AI directly addresses the equitability disparity by offering smallholder farmers personalized, real-time agricultural insights tailored to their specific locations.  

In addressing the equitable access theme of this year's Call for Code challenge, Meadow AI pioneers a solution to the information gap in agriculture, an area often overlooked in favour of broader sustainability and climate-focused initiatives. By democratizing agricultural information, we ensure that farmers have the tools they need to make informed decisions about what to plant, when to plant, and how to cultivate effectively, regardless of their financial status or geographic isolation.`This equitable access is essential to empowering farmers and helping them break free from the recurring cycle of market oversupply and food wastage`.   

Built using IBM's advanced machine learning models, `Meadow AI provides tailored crop recommendations based on localized data—such` as weather forecasts, soil conditions, and regional patterns—that underprivileged farmers might otherwise lack. This levels the playing field, allowing them to diversify their crops, make smarter decisions, and avoid market saturation that has long kept them at an economic disadvantage.   

Our solution goes beyond addressing the challenges of food production; `it tackles the systemic inequities that prevent smallholder farmers from improving their livelihoods`. With step-by-step guidance on cultivating crops, Meadow AI ensures that farmers maximize their yields without falling prey to the unpredictability of market conditions. By providing this crucial information, we bridge the gap between opportunity and action, giving farmers control over their own outcomes.   

`Meadow AI isn't just a technological solution—it’s an equalizer`. By granting access to information that was previously unavailable or inaccessible, our platform empowers farmers to improve both their economic status and food security. In doing so, we introduce a new dimension to the ongoing conversation around sustainability and climate resilience. Our solution highlights that sustainable development must also address the critical need for information access, especially for those who have been historically marginalized.   

Ultimately, `Meadow AI ensures equitable access to the same essential agricultural information enjoyed by larger, more resource-rich farms`, providing a vital tool to smallholder farmers. This focus on equity, combined with advanced technology, positions Meadow AI as a unique and powerful solution to a longstanding problem, empowering farmers to lift themselves out of poverty and contribute meaningfully to global food systems.   

By integrating Meadow AI into agricultural systems, we empower smallholder farmers to take charge of their farming decisions, transforming their ability to predict and respond to market dynamics. This increased access to personalized insights not only improves crop diversification but also strengthens food security, mitigating the risk of crop failures and price drops that often plague these communities. Meadow AI's data-driven approach delivers actionable intelligence that was previously inaccessible, bridging the gap between traditional farming practices and modern technology. In doing so, we enhance farmers' resilience against external shocks like fluctuating weather conditions and volatile markets, offering them a sustainable pathway to economic stability. By leveling the playing field, Meadow AI is fundamentally reshaping the future of agriculture for underprivileged farmers, ensuring that they can fully participate in—and benefit from—global agricultural advancements. This transformative impact positions Meadow AI as a catalyst for both individual empowerment and broader agricultural equity.
## ⚙️ Technology Implementation

### 🛠️ IBM Watsonx Products Used
 **`Wasonx.ai`**:
 - Weather and Climate Data Analysis: Watsonx.ai has been used to analyze large sets of weather and climate data to predict optimal planting times and crop varieties for specific regions. By using historical and real-time data. This is implemented in `/api/watsonxAPI`
 - Daily customized instructions on crop growing: watsonx.ai has been implemented in `/api/languageModelAPI.tsx` to provide the farmer with customized instructions on what to do to their crops in the `/screens/homeScreen` page for easy access.

### Other IBM Technology Used
- **`Watson Machine Learning`**: Has been used in our `screens/AdvisorScreen.tsx` The IBM machine learning model provides tailored crop recommendations for farmers by analyzing various factors, including local soil conditions, climate data, and historical crop success rates. Based on this analysis, the model scores and displays specific crops to the farmer, highlighting their potential success and cultivation complexity. This ensures that the recommendations are not only suitable for the farmer's location but also relevant to their specific circumstances. By using this data-driven approach, farmers can make informed decisions
- **`IBM's Granite-13b-chat-v2_LLM`**: Has been used in our `/api/languageModelAPI.tsx` :  Used to enhance user interactions by generating text responses based on weather data. It fetches weather information using the OpenMeteo API, based on the user's location. Then calculates key metrics and once the weather data is obtained in the `api/promptModel.tsx`, the application then calls the `IBM Granite LLM` in the `/api/languageModelAPI.tsx` to generate a contextual response. This LLM uses the weather information combined with the user's input to create meaningful, tailored text.

### Other Technology Used  
- **`Open Meteo Climate API`**: Has been used to get several years of daily weather forecast which is used by the application for estimate upcoming seasons to keep the farmer informed
  
## 📦 Solution architecture
Diagram and step-by-step description of the flow of our solution:

![Meadow Architecture-1](https://github.com/user-attachments/assets/54217a80-3d2c-4dbd-be77-1e67f31297a0)

- 1. User accesses Meadow AI and is greeted by a user-friendly app interface.
  
- 2. The app provides crop suggestions tailored to the climatic conditions of the user’s area, powered by IBM’s AutoAI machine learning model

- 3. After selecting a crop, the app explains why it's suitable for their region and gives important tips to consider before buying seeds, using IBM's Granite Large Language Model.

- 4. The farmer has the option to save their crop selection and planning details in their account. This requires sign up or log in.
  
- 5. Once a crop is marked, the farmer receives daily tips on how to care for the crop, displayed on their home screen.
  
- Finally, the application acts as a facilitator by connecting the farmer with trusted seed suppliers

##  🎥 Presentation materials
### 🤖 Solution video
[![Watch the video](https://img.youtube.com/vi/ffZvrM6tmkM/0.jpg)](https://www.youtube.com/watch?v=ffZvrM6tmkM)




##  🗺️ Project development roadmap

![Meadow app roadmap-1](https://github.com/user-attachments/assets/643b4718-92c6-4270-ae5c-eda5be4f790a)

The project currently does the following things.

- Provides tailored crop recommendations based on their location
- Provides continuous guidance on effective cultivation practices throughout the growing season
- Offers the option to save the crop selected
- Assist farmers in acquiring the right seeds


## Running the project

### Prerequisites

Ensure you have the following installed on your machine:  
- [Node.js](https://nodejs.org/) (version 12.x or higher)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running the React Native app)  
- [Git](https://git-scm.com/)

### Cloning the Repository

1. Open your terminal or command prompt.
2. Clone the repository:

    ```bash
    git clone https://github.com/MeedowDev/Meadow-AI.git
    ```

3. Navigate into the project directory:

    ```bash
    cd Meadow-AI
    ```
### Installing Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### Running the application 

1. Start the Expo development server:

```bash
npm run start
```
2. Expo will open a browser window with a QR code.
3. Install the Expo Go app on your mobile device from app store or play store
4. Open the Expo Go app on your device and scan the QR code from your browser to load the app on your mobile device.


##  🔥 Live demo




### Acknowledgments
### I want to thank the following people for their support in making this application great:

-`Nyakach`: For advice on solidifying the app and solving real problems.

-`Lyenton`: For technical assistance and resources that helped make it happen.

-`Kim`: For constant feedback during app reviews and tech advice.

-`Nenoo`: For suggestions on UI to make the app more appealing.

-`Wahome`: For always being available when an extra hand was needed.
