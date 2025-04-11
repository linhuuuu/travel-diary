import { useState, ReactNode, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entry } from "./Interfaces";
import { useFonts } from "expo-font";



type ContextProviderType = {
    entries: Entry[];
    setTravelEntries: (item: Entry[]) => void;
    loadContext: () => Promise<void>; 
    themeMode: boolean;
    ToggleTheme: (theme: boolean) => void;
    handleRemove : (id: string) => void;
};

interface ContextProviderProps {
    children: ReactNode;
}

export const Context = createContext<ContextProviderType>({
    entries: [],
    setTravelEntries: () => {},
    loadContext: async () => {}, 
    themeMode: false,
    ToggleTheme: () => {},
    handleRemove: () => {},
});

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [themeMode, setThemeMode] = useState<boolean>(false);
    const [newEntry, SetNewEntry] = useState<Entry | null>(null);

    const ToggleTheme = (theme: boolean) => {
        setThemeMode(!theme);
    };

    const setTravelEntries = (item: Entry[]) => {
        setEntries(item);
        AsyncStorage.setItem('entries', JSON.stringify(item)).catch((error) => {
            console.error("Failed to save entries:", error);
        });
    };

    const loadContext = async () => {
        try {
            const storedEntries = await AsyncStorage.getItem('entries');
            if (storedEntries) {
                const parsedEntries: Entry[] = JSON.parse(storedEntries);
                setEntries(parsedEntries);
                
            } else {
                console.log("No entries found in AsyncStorage.");
            }
        } catch (error) {
            console.error("Failed to load entries:", error);
        }
    };

    useEffect(() => {
        loadContext(); 
    }, []);

    const handleRemove = (id: string) => {
        const newEntries = entries.filter((entry) => entry.id !== id);
        setTravelEntries(newEntries);
    };

   
    const [fontsLoaded] = useFonts({
      Grotesk_Bold: require("../assets/ClashGrotesk-Bold.otf"),
      Grotesk_Extralight: require("../assets/ClashGrotesk-Extralight.otf"),
      Grotesk_Light: require("../assets/ClashGrotesk-Light.otf"),
      Grotesk_Medium: require("../assets/ClashGrotesk-Medium.otf"),
      Grotesk_Regular: require("../assets/ClashGrotesk-Regular.otf"),
      Grotesk_Semibold: require("../assets/ClashGrotesk-Semibold.otf"),
    });
    

    return (
        <Context.Provider value={{ entries, setTravelEntries, loadContext, themeMode, ToggleTheme, handleRemove }}>
            {children}
        </Context.Provider>
    );
};