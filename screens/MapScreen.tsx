import React, { useContext, useState, useEffect } from 'react';
import tw from 'twrnc';
import { View, ActivityIndicator, Text,TouchableOpacity,Linking,Image,TextInput} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { LocationContext } from '../context/locationContext';
import axios from 'axios';
import { getDistance } from 'geolib';

// Define a type for nearby shops
interface Shop {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  distance: number;
  phoneNumber: string; // Add this line
  shopLogoUrl:string;
}

export default function MapScreen() {
  const { userLocation, errorMsg} = useContext(LocationContext);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]); // Explicitly type state as an array of Shop
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null); // Explicitly type state as Shop or null
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]); // Explicitly type route coordinates
  const [distanceToShop, setDistanceToShop] = useState<number | null>(null); // Explicitly type state as number or null
  // Simulate fetching nearby shops
  useEffect(() => {
    if (userLocation) {
      const shops = [
        { id: 1, latitude: userLocation.coords.latitude + 0.005, longitude: userLocation.coords.longitude + 0.005, title: 'Shop 1' ,phoneNumber: '254746755841',    shopLogoUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual URL
        },
        { id: 2, latitude: userLocation.coords.latitude + 0.01, longitude: userLocation.coords.longitude + 0.01, title: 'Shop 2',phoneNumber: '254746755841',    shopLogoUrl: 'https://plus.unsplash.com/premium_photo-1681488494531-b0a2f48abf68?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual URL
        },
        { id: 3, latitude: userLocation.coords.latitude - 0.01, longitude: userLocation.coords.longitude - 0.005, title: 'Shop 3' ,phoneNumber: '254746755841',    shopLogoUrl: 'https://plus.unsplash.com/premium_photo-1717013912587-a9a86cdcafd3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual URL
        },
      ];

      const shopsWithDistance = shops.map((shop) => {
        const distance = getDistance(
          {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          },
          {
            latitude: shop.latitude,
            longitude: shop.longitude,
          }
        );
        return { ...shop, distance }; // Attach the distance to each shop
      });

      setNearbyShops(shopsWithDistance);
    }
  }, [userLocation]);

  // Update distance and route as the user moves
  useEffect(() => {
    if (selectedShop && userLocation) {
      const distance = getDistance(
        { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
        { latitude: selectedShop.latitude, longitude: selectedShop.longitude }
      );
      setDistanceToShop(distance); // Update distance to the selected shop
      fetchRoute(selectedShop); // Fetch the route to the selected shop
    }
  }, [userLocation, selectedShop]);

  // Fetch route from OSRM service
  const fetchRoute = async (destination: Shop) => {
    if (userLocation && destination) {
      try {
        const origin = `${userLocation.coords.longitude},${userLocation.coords.latitude}`;
        const destinationCoords = `${destination.longitude},${destination.latitude}`;
        const response = await axios.get(
          `http://router.project-osrm.org/route/v1/driving/${origin};${destinationCoords}?overview=full&geometries=geojson`
        );

        if (response.data.routes.length) {
          const coordinates = response.data.routes[0].geometry.coordinates.map(([longitude, latitude]: [number, number]) => ({
            latitude,
            longitude,
          }));
          setRouteCoordinates(coordinates);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    }
  };

// Assuming distanceToShop is defined and can be null
const estimatedTimeToShop = distanceToShop !== null ? (distanceToShop / 1000) / 0.0833 : 0; // Example calculation

    // WhatsApp contact handler
  const contactShopOnWhatsApp = (contact: string) => {
    if (contact && typeof contact === 'string') {
      const cleanedContact = contact.replace(/\D/g, '');
      const url = `https://wa.me/${cleanedContact}`;
      Linking.openURL(url)
        .catch((err) => console.error('Failed to open WhatsApp:', err));
    } else {
      console.error('Contact number is undefined or missing');
    }
  };


  if (!userLocation) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        {errorMsg ? (
          <Text style={tw`text-red-500 text-lg`}>{errorMsg}</Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }

  const region = {
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`w-full h-3/4 bg-white rounded-lg shadow-lg overflow-hidden`}>
      <View style={tw`absolute top-1.5 left-4 right-15 z-6`}>
      <TextInput
          style={tw`border border-gray-300 rounded-full p-2 bg-white shadow`}
          placeholder="    Click a shop for more information"
          editable={false} // Make it read-only if you just want to show the message
        />
      </View>
        <MapView
          style={tw`flex-1`}
          region={region}
          showsUserLocation={true}
        >
          {/* Current Location Marker */}
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="You are here"
            description="Current Location"
            pinColor="blue"
          />

          {/* Nearby Shops Markers */}
          {nearbyShops.map((shop) => (
            <Marker
              key={shop.id}
              coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
              title={shop.title}
              description={`Distance: ${(shop.distance / 1000).toFixed(2)} km`}
              pinColor={selectedShop?.id === shop.id ? 'red' : 'purple'}
              onPress={() => {
                setSelectedShop(shop);
              }}
            />
          ))}

          {/* Display route between user and selected shop */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={distanceToShop && distanceToShop <= 1000 ? 'green' : 'blue'} // Highlight based on distance
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
      {/* Show the distance from current location to the selected shop */}
      {selectedShop && (
        <View style={tw`absolute bottom-1 left-1 right-1 bg-white p-12 rounded-3 shadow-lg`}>
          <View style={tw`flex-row items-center right-1 mb-4`}>
          <Image
        source={{ uri: selectedShop.shopLogoUrl }} // Use the selected shop's logo URL
        style={tw`w-15 h-10 mr-2 rounded-full`} // Adjust the size of the logo here
              resizeMode="contain"  
            />
            <View>
          <Text style={tw`text-lg font-bold text-gray-600 `}>{selectedShop.title}</Text>
          <View style ={tw`flex-row`}>
          {/* Estimated Time to Shop */}
          <Text style={tw`text-xs mb-2`}>
            {estimatedTimeToShop.toFixed(0)} min walk {/* Replace with actual time */}
          </Text>
           {/* Open Till Time */}
           <Text style={tw`text-green-500 text-xs font-bold`}>
            Open till 6 PM
          </Text>
          </View>
            </View>
          </View>
          <View style={tw`p-3 bg-white-100 border border-green-500 rounded-lg mb-2`}>
            <Text style={tw`text-gray-600`}>
              Distance: {(distanceToShop ?? 0 / 1000).toFixed(2)} m
            </Text>
          </View>          
        <TouchableOpacity 
      style={tw`mt-3 p-4 bg-green-500 rounded-full`}
      onPress={() => {
    if (selectedShop) {
      console.log('Selected Shop:', selectedShop); // Add this log
      if (selectedShop.phoneNumber) {
        contactShopOnWhatsApp(selectedShop.phoneNumber);
      } else {
        console.error('Selected Shop does not have a phone number');
      }
    } else {
      console.error('No shop is selected');
    }
  }}
>
  <Text style={tw`text-white text-center`}>Contact on WhatsApp</Text>
</TouchableOpacity>
  </View>
      )}
    </View>
  );
}