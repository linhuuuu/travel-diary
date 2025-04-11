import * as Location from "expo-location";
import { LocationCoords } from "../Navigation Context and interfaces/Interfaces";

export const getCurrentLocation = async (): Promise<LocationCoords> => {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        alert("Location permissions must be enabled for TravelDiary to record your diary log.");
    }

    try {
        const locationData = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });
        return {
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
        };
    } catch (error) {
        alert("Failed to locate your area. Please try again:");
        throw new Error;
    }
};

export const getAddress = async (location: LocationCoords): Promise<string> => {
    try {
        const addressData = await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude,
        });

        const formattedAddress = formatAddress(
            addressData[0].name ?? "N/A",
            addressData[0].city ?? "N/A",
            addressData[0].region ?? "N/A",
            addressData[0].postalCode ?? "N/A"
        );

        return formattedAddress;
    } catch (error) {
        console.error("Error getting address:", error);
        throw new Error("Failed to get address");
    }

    function formatAddress(name: string, city: string, region: string, postalCode: string): string {
        return `${name}, ${city}, ${region}, ${postalCode}`;
    }
};