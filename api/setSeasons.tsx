const seasonToConditionMap = {
    'Rainy Season': 'rainy',
    'Dry Season': 'sunny',
    'Cool Season': 'cold',
    'Windy Season': 'windy',
    'Sunny/Hot Season': 'sunny',
    'Unknown Season': 'cloudy',  // Fallback for any unrecognized season
  };


const seasonThresholds = {
    RainySeason: { minHumidity: 80 },
    DrySeason: { maxHumidity: 60, minTemperature: 25 },
    CoolSeason: { maxTemperature: 15 },
    WindySeason: { maxWindSpeed: 10 },
    SunnySeason: { minTemperature: 25, maxPrecipitation: 5 },
};
export function getSeasonBasedOnWeather(data, start, end) {
    const { daily } = data;

    const avgMaxTemperature = daily.temperature_2m_max?.slice(start, end).reduce((a, b) => a + b, 0) / (end - start) || 0;
    const avgMinTemperature = daily.temperature_2m_min?.slice(start, end).reduce((a, b) => a + b, 0) / (end - start) || 0;
    const avgWindSpeed = daily.wind_speed_10m_mean?.slice(start, end).reduce((a, b) => a + b, 0) / (end - start) || 0;
    const avgHumidity = daily.relative_humidity_2m_mean?.slice(start, end).reduce((a, b) => a + b, 0) / (end - start) || 0;
    const avgPrecipitation = daily.precipitation?.slice(start, end).reduce((a, b) => a + b, 0) / (end - start) || 0;

    console.log("Averages - Max Temp:", avgMaxTemperature, "Min Temp:", avgMinTemperature, "Wind Speed:", avgWindSpeed, "Humidity:", avgHumidity, "Precipitation:", avgPrecipitation);

    if (avgHumidity > seasonThresholds.RainySeason.minHumidity) {
        return "Rainy Season";
    } else if (avgHumidity < seasonThresholds.DrySeason.maxHumidity && avgMaxTemperature > seasonThresholds.DrySeason.minTemperature) {
        return "Dry Season";
    } else if (avgMaxTemperature < seasonThresholds.CoolSeason.maxTemperature) {
        return "Cool Season";
    } else if (avgWindSpeed > seasonThresholds.WindySeason.maxWindSpeed) {
        return "Windy Season";
    } else if (avgMaxTemperature > seasonThresholds.SunnySeason.minTemperature && avgPrecipitation < seasonThresholds.SunnySeason.maxPrecipitation) {
        return "Sunny/Hot Season";
    }
    
    return "Unknown Season";
}

