import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import tw from "twrnc";
import handleScoreModel from "../api/watsonxApi";
import { getCurrentWeather } from "../api/RealTimeWeather";

// Utility function to normalize and fetch the correct weather icon
export const getWeatherIcon = (condition) => {
    if (!condition) return 'weather-cloudy'; // Default if no condition is available
  
    // Normalize the condition to lowercase to avoid case sensitivity issues
    const normalizedCondition = condition.trim().toLowerCase();
    console.log("Normalized Condition:", normalizedCondition);
  
    // Match based on normalized weather conditions
    switch (normalizedCondition) {
      case 'clear':
      case 'sunny':
        return 'weather-sunny';
      case 'Partly cloud':
      case 'overcast':
        return 'weather-cloudy';
      case 'partly cloudy':
        return 'weather-partly-cloudy';
      case 'rainy':
        return 'weather-rainy';
      case 'snow':
        return 'weather-snowy';
      case 'fog':
      case 'mist':
        return 'weather-fog';
      case 'thunderstorm':
        return 'weather-lightning';
      case 'windy':
        return 'weather-windy';
      case 'cold':
        return 'weather-snowflake';
      default:
        // Default case if none of the above conditions match
        return 'weather-cloudy';
    }
};
  
  // Mapping seasons to icons
  export const getSeasonIcon = (season) => {
    switch (season) {
      case 'Rainy Season':
        return 'weather-rainy';
      case 'Dry Season':
        return 'weather-sunny';
      case 'Cool Season':
        return 'weather-snowflake';
      case 'Windy Season':
        return 'weather-windy';
      case 'Sunny/Hot Season':
        return 'weather-sunny';
      default:
        return 'weather-cloudy';  // Default icon for unknown season
    }
  };
  
  const WeatherCard = ({ latitude, longitude, temperature, humidity, windSpeed }) => {
    const [season, setSeason] = useState(null);
    const [weather, setWeather] = useState(null); // Weather data like condition
    const [condition, setCondition] = useState(null); // Specific weather condition (e.g., sunny)
  
    useEffect(() => {
        const fetchSeason = async () => {
          try {
            const result = await handleScoreModel(latitude, longitude);
            console.log("Full result from handleScoreModel:", result);
            if (result && result.season) {
              setSeason(result.season);
            }
          } catch (error) {
            console.error("Error fetching season data:", error);
          }
        };
        fetchSeason();
      }, [latitude, longitude]);
      
      useEffect(() => {
        const fetchCondition = async () => {
          try {
            const result = await getCurrentWeather({ coords: { latitude, longitude } });
            console.log("Full result from getCurrentWeather API:", result); // Log the entire response object
        
            // Check if the correct fields exist in the result
            if (result && result.current) {
              console.log("***********Current weather data:", result.current); // Log the current weather data
        
              // Depending on API structure, check the path
              const weatherCondition = result.current.condition?.text || result.current.weather?.[0]?.main || null;
              
              if (weatherCondition) {
                setCondition(weatherCondition); // Set the weather condition
              } else {
                console.error("Weather condition is not available in the getCurrentWeather API response.");
              }
            } else {
              console.error("Current weather data is missing in the getCurrentWeather API response.");
            }
          } catch (error) {
            console.error("Error fetching weather condition:", error);
          }
        };
        fetchCondition();
      }, [latitude, longitude]);
      


    const conditionText = weather?.current?.condition?.text || "No Weather Data";
    const weatherIcon = getWeatherIcon(conditionText);
    console.log("Rendered Weather Icon:", weatherIcon);

    const seasonIcon = getSeasonIcon(season);
    
    // Fallback temperature values if `temperature` object is not provided or incomplete
    const highTemp = temperature?.high || "N/A";
    const lowTemp = temperature?.low || "N/A";
    return (
        <View style={tw`twbg-white rounded-3xl p-4 bg-gray-200 w-80`}>
            <View style={tw`twflex flex-col justify-between mb-4`}>
                {/* Season Section */}
                <View style={tw`w-[100%] flex flex-row justify-around`}>
                    <Text style={tw`font-bold text-lg`}>Season</Text>
                    <Text style={tw`font-bold text-lg`}>Today</Text>
                </View>

                <View style={tw`items-center w-[100%] flex-row justify-around`}>
                    <View style={tw`w-[50%] flex justify-center items-center`}>
                        <MaterialCommunityIcons name={seasonIcon} size={75} color="grey" />
                    </View>
                    <View style={tw`flex flex-row items-center w-[50%] justify-around`}>
                        <MaterialCommunityIcons name={weatherIcon} size={50} color={COLORS.ACCENT_COLOR} />
                        <View style={tw`flex flex-row`}>
                            <Text style={[tw`font-bold text-lg mt-2`, { color: COLORS.ACCENT_COLOR }]}>H: 23{temperature.high}°C{"\n"}L:  22{temperature.low}°C</Text>
                        </View>
                    </View>
                </View>

                <View style={tw`items-center flex flex-row w-[100%] mt-2`}>
                    <View style={tw`flex flex-col w-[50%] items-center`}>
                        <Text style={tw`text-gray-500`}>{season}</Text>
                        <Text style={tw`font-bold text-2xl text-gray-700`}>23°C-28°C</Text>
                        <Text style={tw`text-gray-500`}>June \\ October</Text>
                    </View>
                    <View style={tw`flex flex-row w-[50%] justify-around px-2`}>
                        <View style={tw`flex flex-col justify-start mr-7`}>
                            <MaterialCommunityIcons name="weather-windy" size={24} color="grey" />
                            <Text style={tw`text-gray-500`}>23km/h{"\n"}south</Text>
                        </View>

                        <View style={tw`flex flex-col justify-start`}>
                            <MaterialCommunityIcons name="water-percent" size={24} color="grey" />
                            <Text style={tw`text-gray-500`}>60%{"\n"}humidity</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default WeatherCard;
