import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import tw from "twrnc";
import handleScoreModel from "../api/watsonxApi";

// Function to map weather conditions to icons
export const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'clear':
        case 'sunny':
            return 'weather-sunny';
        case 'cloudy':
        case 'overcast':
            return 'weather-cloudy';
        case 'rainy':
            return 'weather-rainy';
        case 'snow':
            return 'weather-snowy';
        case 'fog':
        case 'mist':
            return 'weather-fog';
        case 'thunderstorm':
            return 'weather-lightning';
        case 'partly cloudy':
            return 'weather-partly-cloudy';
        case 'windy':
            return 'weather-windy';
        case 'cold':
            return 'weather-snowflake';
        default:
            return 'weather-cloudy'; // Default icon
    }
};

// Mapping seasons to weather conditions
const seasonToConditionMap = {
    'Rainy Season': 'rainy',
    'Dry Season': 'sunny',
    'Cool Season': 'cold',
    'Windy Season': 'windy',
    'Sunny/Hot Season': 'sunny',
    'Unknown Season': 'cloudy',  // Fallback for unknown season
};

// Function to map seasons to icons
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

const WeatherCard = ({ latitude, longitude, temperature, humidity, windSpeed, pressure }) => {
    const [season, setSeason] = useState(null);
    const [weather, setWeather] = useState(null); // Add weather state if needed

    useEffect(() => {
        const fetchSeason = async () => {
            const result = await handleScoreModel(latitude, longitude);
            if (result) {
                setSeason(result.season);
                setWeather(result.weather); // Assuming result contains weather info
            }
        };
        fetchSeason();
    }, [latitude, longitude]);

    const condition = seasonToConditionMap[season] || 'cloudy'; // Default to cloudy if no match
    const weatherIcon = getWeatherIcon(weather); // Get the correct icon based on the weather
    const seasonIcon = getSeasonIcon(season); // Get the correct icon based on the season

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
                            <Text style={tw`text-gray-500`}>{windSpeed} km/h{"\n"}south</Text>
                        </View>

                        <View style={tw`flex flex-col justify-start`}>
                            <MaterialCommunityIcons name="water-percent" size={24} color="grey" />
                            <Text style={tw`text-gray-500`}>{humidity} Percent{"\n"}humidity</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default WeatherCard;
