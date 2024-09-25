// src/context/LocationContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Location from "expo-location";

interface LocationContextType {
	userLocation: Location.LocationObject | null;
	errorMsg: string | null;
}

export const LocationContext = createContext<LocationContextType>({
	userLocation: null,
	errorMsg: null,
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setUserLocation(location);
			console.log("Location granted", location);
		})();
	}, []);

	return <LocationContext.Provider value={{ userLocation, errorMsg }}>{children}</LocationContext.Provider>;
};
