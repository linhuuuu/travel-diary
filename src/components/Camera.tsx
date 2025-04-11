import * as ImagePicker from "expo-image-picker";


export const takePicture = async (): Promise<string> => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permissions must be enabled for TravelDiary to take Pictures.");
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            return result.assets[0].uri;
        } else {
            throw new Error;
        }
    };
