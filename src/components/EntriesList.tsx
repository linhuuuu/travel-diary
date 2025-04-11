import React, { useContext } from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { Context } from "../Navigation Context and interfaces/Context";
import { styles } from "../styles/styles";
export const EntriesList = () => {
    const { entries, handleRemove, themeMode } = useContext(Context);
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={entries}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={[styles.fontRegular, themeMode && styles.darkFont]}>No entries yet...</Text>}
            renderItem={({ item }) => (

                <View style={[styles.list, themeMode && styles.darkEntry, { marginBottom: 10, transform: [{ rotate: '1.7deg' }] }]}>
                    <View style={styles.inner}>
                        {item.Image && (
                            <Image
                                source={{ uri: item.Image }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        )}
                        <Text style={[styles.heading, styles.fontLight, themeMode && styles.darkHeading]}>Coordinates</Text>
                        <Text style={[styles.fontRegular, themeMode && styles.darkFont]}>{item.Location}</Text>
                        <Text style={[styles.heading, themeMode && styles.darkHeading]}>Location</Text>
                        <Text style={[styles.fontRegular, themeMode && styles.darkFont]}>{item.Address}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            console.log("Remove button pressed for ID:", item.id);
                            handleRemove(item.id);
                        }}>
                        <Text style={[styles.heading, styles.fontLight, styles.remove, themeMode && styles.darkFont]}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>


            )}
        />
    );
};