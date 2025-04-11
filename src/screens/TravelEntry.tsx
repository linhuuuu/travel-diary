import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Props, Entry } from "../Navigation Context and interfaces/Interfaces";
import { Context } from "../Navigation Context and interfaces/Context";
import { requestNotification, sendNotification } from "../components/Notifications";
import { takePicture } from "../components/Camera";
import { getAddress, getCurrentLocation } from "../components/Location";
import uuid from "react-native-uuid";
import { styles } from "../styles/styles";
import { transform } from "@babel/core";

const TravelEntry: React.FC<Props> = ({ navigation }) => {

    const { entries, setTravelEntries, themeMode } = useContext(Context);
    const [newEntry, setNewEntry] = useState<Entry | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleEntry = async () => {
        setNewEntry(null);
        setLoading(true);
        try {

            const imageUri = await takePicture();
            const location = await getCurrentLocation();
            const address = await getAddress(location);

            if (!imageUri || !location || !address.trim()) {
                setNewEntry(null);
            }

            const newEntry: Entry = {
                id: uuid.v4(),
                Image: imageUri,
                Location: `${location.latitude}, ${location.longitude}`,
                Address: address.trim(),
            };

            setNewEntry(newEntry);

        } catch (error) {
            alert("An error occurred while trying to create diary log. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!newEntry) {
            console.error("newEntry is Null")
            return;
        }
        setTravelEntries([...entries, newEntry]);
        navigation.navigate("Home")
        requestNotification();
        sendNotification();
    }

    return (

        <View style={[styles.container, themeMode && styles.darkBG]}>
            <Text style={[styles.header, themeMode && styles.darkFont]}> Entry Log</Text>
            <View>
                {!newEntry && !loading &&
                    <Text style={[styles.fontRegular, themeMode && styles.darkFont, { alignSelf: "center" }]}> Crickets... </Text>}

                {loading &&
                    <Text style={[styles.fontRegular, themeMode && styles.darkFont, { alignSelf: "center" }]}> Loading... </Text>}

                {newEntry &&
                    <View style={[styles.list, themeMode && styles.darkEntry, {}]}>
                        <Image source={{ uri: newEntry.Image }} style={styles.image} />
                        <Text style={[styles.heading, styles.fontLight, themeMode && styles.darkHeading]}>Coordinates</Text>
                        <Text style={[styles.fontRegular, themeMode && styles.darkFont]}>{newEntry.Location}</Text>
                        <Text style={[styles.heading, styles.fontLight, themeMode && styles.darkHeading]}>Location</Text>
                        <Text style={[styles.fontRegular, themeMode && styles.darkFont]}>{newEntry.Address}</Text>
                    </View>
                }
            </View>
            <View style={styles.buttonFooter}>
                <TouchableOpacity style={[styles.button, themeMode && styles.darkButton]} onPress={handleEntry}>
                    <Text style={[styles.buttonFont, themeMode && styles.darkFont]}>{!newEntry ? "Take a Picture!" : "Retake"}</Text>
                </TouchableOpacity>
                {newEntry && <TouchableOpacity style={[styles.button, { backgroundColor: themeMode ?  "#403f3e" :  "#c42c06" }]} onPress={handleSave}>
                    <Text style={[styles.buttonFont, themeMode && styles.darkFont]}>Save</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default TravelEntry;