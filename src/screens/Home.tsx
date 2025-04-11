import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../Navigation Context and interfaces/Context";
import { EntriesList } from "../components/EntriesList";
import { Props, Entry } from "../Navigation Context and interfaces/Interfaces";
import { styles } from "../styles/styles";
import { Provider as PaperProvider, Portal, Dialog, Button, DefaultTheme } from 'react-native-paper';
const Home: React.FC<Props> = ({ navigation }) => {
    const { entries, setTravelEntries, ToggleTheme, themeMode } = useContext(Context);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const fetchedEntries = await AsyncStorage.getItem('entries');
                if (fetchedEntries !== null) {
                    const parsedEntries: Entry[] = JSON.parse(fetchedEntries);
                    setTravelEntries(parsedEntries);
                }
            } catch (e) {
                console.error("Failed to load data:", e);
            }
        };

        loadEntries();
    }, []);

    return (
        <PaperProvider theme={DefaultTheme}>
            <View style={[styles.container, themeMode && styles.darkBG]}>
                <View >
                    <Text style={[styles.header, themeMode && styles.darkFont]}>Travel Diary</Text>
                </View>

                <View style={styles.listcontainer}>
                    <EntriesList />
                </View>

                <TouchableOpacity style={[styles.button, themeMode && styles.darkButton]} onPress={() => navigation.navigate('TravelEntry')}>
                    <Text style={styles.buttonFont}>Create an Entry</Text>
                </TouchableOpacity>

                <View style={styles.footer}>

                   
                        <TouchableOpacity onPress={showDialog}>
                        {entries.length > 0 && (
                            <Text style={[styles.fontLight, styles.clear, themeMode && styles.darkFont]}>
                                Clear Diary
                            </Text>
                         )}
                        </TouchableOpacity>
                   

                    <View style={[{ flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                        <Text style={[styles.fontLight, themeMode && styles.darkFont]}>{themeMode ? "Dark Mode" : "Light Mode"}</Text>
                        <Switch
                            trackColor={{ false: "#dbdbdb", true: "#dbdbdb" }}
                            thumbColor={themeMode ? "#000" : "#000"}
                            ios_backgroundColor="#dbdbdb"
                            onValueChange={() => ToggleTheme(themeMode)}
                            value={themeMode}
                        />
                    </View>
                </View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog} style={{ alignItems: 'center' }}>
                        <Dialog.Title>Clear Logs</Dialog.Title>
                        <Dialog.Content>
                            <Text style={{ textAlign: 'center' }}>Are you sure you want to clear all logs?</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{ justifyContent: 'center' }}>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button onPress={() => {
                                AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
                                setTravelEntries([]); hideDialog();
                            }}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    );
};

export default Home;