import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import TravelEntry from "../screens/TravelEntry";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (

            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>

                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="TravelEntry" component={TravelEntry} />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default AppNavigator;