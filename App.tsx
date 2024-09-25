import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import "react-native-gesture-handler";
// import tw from "twrnc";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as FileSystem from 'expo-file-system';

const locationFilePath = FileSystem.documentDirectory + 'location.json';

export default function App() {
  const [userLocation, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      saveLocation(location);
	  console.log("Location",location)
    })();
  }, []);

  const saveLocation = async (location: Location.LocationObject) => {
    const newLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: new Date().toISOString(),
    };

    try {
      // Check if the file exists, and if so, append the new location
      const fileExists = await FileSystem.getInfoAsync(locationFilePath);
      let locations = [];

      if (fileExists.exists) {
        const existingData = await FileSystem.readAsStringAsync(locationFilePath);
        locations = JSON.parse(existingData);
      }

      locations.push(newLocation);
      await FileSystem.writeAsStringAsync(locationFilePath, JSON.stringify(locations));
      console.log("Location saved to file");
    } catch (error) {
      console.log("Error saving location data: ", error);
    }
  };

  return <AppNavigation />;
}
