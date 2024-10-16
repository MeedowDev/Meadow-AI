<p align="left">
  <img src="https://github.com/user-attachments/assets/55f3ecd6-5540-423a-a083-d7f8c4b94d5d" alt="meadow logo" width="80" style="border-radius: 100%;"/> <!-- Adjust width as needed -->
 <span style="font-size: 88px; margin-left: 40px;">Meadow Project Overview</span>
</p>

## 🌍 The Issue We Are Hoping to Solve
Many small-scale farmers in Africa remain below the poverty line due to unequal access to agricultural information. This knowledge gap leads to uniform crop planting, causing market saturation and driving prices down. By addressing this issue, we can empower farmers to diversify their crops and enhance their livelihoods.

### 💡 How Our Technology Solution Can Help
Our solution leverages `IBM's machine learning model` to empower farmers with tailored crop guidance.

## 🌿 Our Idea
We are leveraging `IBM's machine learning model` to provide farmers with tailored crop recommendations based on their location. Our innovative application offers step-by-step guidance for effectively cultivating selected crops. 

This solution addresses the issue of market saturation caused when small-scale farmers plant the same crops simultaneously, leading to a market glut that drives prices down and diminishes profits. 

By using `IBM's machine learning model` to analyze data such as temperature, humidity, and rainfall, our application helps farmers make informed decisions about what to plant and when, enabling effective planning. We assist farmers in acquiring the right seeds by collaborating with reputable suppliers, ensuring they have access to the best seeds for their specific environmental conditions, which is crucial for achieving optimal crop performance. 

Our platform covers every aspect of the cultivation process—from soil preparation to land management—providing tailored advice essential for nurturing healthy crops. The integration of  `IBM's Granite-13b-chat-v2_LLM` in our application allows us to provide personalized recommendations that cater to the unique circumstances of each farmer. This continuous support is vital for helping farmers adapt to changing conditions and improve their overall agricultural practices.

Additionally, our application enables farmers to explore a variety of crop options based on their preferences and market demand. This flexibility is essential in a dynamic agricultural landscape where market conditions and consumer preferences can shift rapidly. 

Farmers can inquire about the sustainability of different crops and receive recommendations based on current and upcoming seasons. This not only helps them maximize their profits but also promotes environmentally friendly practices. 

Moreover, our application allows farmers to manage different crops simultaneously, ensuring they can efficiently track the progress of each one. This functionality aids in monitoring growth, identifying potential issues early on, and making necessary adjustments to cultivation practices. 

Ultimately, our goal is to bridge the gap in agricultural knowledge and resources, enabling farmers to improve their yields, enhance their livelihoods, and contribute to food security in their communities. By fostering a more informed and resourceful farming community, we believe we can make a meaningful impact on agriculture. 

Our application stands out by offering unique, location-specific recommendations tailored to the current conditions of small-scale farmers, directly addressing the limitations of existing small-scale agricultural solutions in Africa.As highlighted in the analysis on smallholder agriculture, addressing the unique challenges faced by these farmers is crucial for food security: "[Smallholder Agriculture and the Challenge of Feeding Ourselves.](https://www.theelephant.info/analysis/2023/05/09/smallholder-agriculture-and-the-challenge-of-feeding-ourselves/#:~:text=Most%20farms%2C%20they%20say%20up,some%20parts%20of%20the%20country.)"

## ⚙️ Technology Implementation

### 🛠️ IBM Watsonx Products Used
- **`IBM's Granite-13b-chat-v2_LLM`**: Has been used in our `/api/languageModelAPI.tsx` :  Used to enhance user interactions by generating text responses based on weather data. It fetches weather information using the OpenMeteo API, based on the user's location. Then calculates key metrics and once the weather data is obtained in the `api/promptModel.tsx`, the application then calls the `IBM Granite LLM` in the `/api/languageModelAPI.tsx` to generate a contextual response. This LLM uses the weather information combined with the user's input to create meaningful, tailored text.

### Other IBM Technology Used
- **`Watson Machine Learning`**: Has been used in our `screens/AdvisorScreen.tsx` The IBM machine learning model provides tailored crop recommendations for farmers by analyzing various factors, including local soil conditions, climate data, and historical crop success rates. Based on this analysis, the model scores and displays specific crops to the farmer, highlighting their potential success and cultivation complexity. This ensures that the recommendations are not only suitable for the farmer's location but also relevant to their specific circumstances. By using this data-driven approach, farmers can make informed decisions
  
## 📦 Solution architecture
Diagram and step-by-step description of the flow of our solution:

![Meadow Architecture-1](https://github.com/user-attachments/assets/54217a80-3d2c-4dbd-be77-1e67f31297a0)

- The farmer accesses a user-friendly dashboard to select a crop for planting..
  
- Upon selection, the IBM AutoAI machine learning model analyzes various parameters relevant to the farmer's location. 

- The farmer then engage with IBM Granite-13-b-v-2-Chat LLM, which answers questions and provides assistance..

- The farmer has the option to save their crop selection and planning details in their account. This requires sign up or log in,.
  
- Finally, the application acts as a facilitator by connecting the farmer with trusted seed suppliers

##  🎥 Presentation materials
### 🤖 Solution video



##  🗺️ Project development roadmap

![Meadow app roadmap-1](https://github.com/user-attachments/assets/643b4718-92c6-4270-ae5c-eda5be4f790a)

The project currently does the following things.

- Provides tailored crop recommendations based on their location
- Provides continuous guidance on effective cultivation practices throughout the growing season
- Offers the option to save the crop selected
- Assist farmers in acquiring the right seeds


## Additional details

### How to run the project
-Node 14 or newer versions required

-Expo CLI: Installed globally

-required packages npm 

-Access the application using expo

##  🔥 Live demo




### Acknowledgments
### I want to thank the following people for their support in making this application great:

-`Nyakach`: For advice on solidifying the app and solving real problems.

-`Lyenton`: For technical assistance and resources that helped make it happen.

-`Kim`: For constant feedback during app reviews and tech advice.

-`Neno`: For suggestions on UI to make the app more appealing.

-`Wahome`: For always being available when an extra hand was needed.

