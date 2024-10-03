import React, { useContext, useState, useEffect } from 'react';
import tw from 'twrnc';
import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { LocationContext } from '../context/locationContext';
import axios from 'axios';
import { getDistance } from 'geolib';

export default function MapScreen() {
  const { userLocation, errorMsg } = useContext(LocationContext);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceToShop, setDistanceToShop] = useState(null);

  // Simulate fetching nearby shops
  useEffect(() => {
    if (userLocation) {
      const shops = [
        { id: 1, latitude: userLocation.coords.latitude + 0.005, longitude: userLocation.coords.longitude + 0.005, title: 'Shop 1' },
        { id: 2, latitude: userLocation.coords.latitude + 0.01, longitude: userLocation.coords.longitude + 0.01, title: 'Shop 2' },
        { id: 3, latitude: userLocation.coords.latitude - 0.01, longitude: userLocation.coords.longitude - 0.005, title: 'Shop 3' },
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
  const fetchRoute = async (destination) => {
    if (userLocation && destination) {
      try {
        const origin = `${userLocation.coords.longitude},${userLocation.coords.latitude}`;
        const destinationCoords = `${destination.longitude},${destination.latitude}`;
        const response = await axios.get(
          `http://router.project-osrm.org/route/v1/driving/${origin};${destinationCoords}?overview=full&geometries=geojson`
        );

        if (response.data.routes.length) {
          const coordinates = response.data.routes[0].geometry.coordinates.map(([longitude, latitude]) => ({
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
      <View style={tw`w-full h-1/2 bg-white rounded-lg shadow-lg overflow-hidden`}>
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
              strokeColor={distanceToShop <= 1000 ? 'green' : 'blue'} // Highlight based on distance
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>

      {/* Show the distance from current location to the selected shop */}
      {selectedShop && (
        <View style={tw`absolute bottom-10 left-5 right-5 bg-white p-4 rounded-lg shadow-lg`}>
          <Text style={tw`text-lg font-bold text-gray-700`}>{selectedShop.title}</Text>
          <Text style={tw`text-gray-600`}>
            Distance from your location: {(distanceToShop / 1000).toFixed(2)} km
          </Text>
        </View>
      )}
    </View>
  );
}
