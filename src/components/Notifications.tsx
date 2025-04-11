import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';
import Constants from "expo-constants";
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

    export const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Safe Travels!',
            body: 'A new entry has been logged into your TravelDiary',
            sound: 'default',


        } , trigger: null,
     })
    };

    export const requestNotification = async () => {

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert:true,
                shouldPlaySound:true,
                shouldSetBadge:true,
            }),
        });
        
        useEffect(() => {
            registerForPushNotificationsAsync();
        })


        async function registerForPushNotificationsAsync() {
            let token;

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                })
            }

            if (!Device.isDevice) {
                alert('Must use a physical device for push notifications.');
                return;
            }

            const {granted: existingPermission} = await Notifications.getPermissionsAsync();
            console.log(existingPermission);

            let finalPermission = existingPermission;

            if(!existingPermission){
                const {granted: newPermission} = await Notifications.getPermissionsAsync();
                finalPermission= existingPermission;
            }

            if (!finalPermission){
                alert('Permissions must be enabled to get push notifications.')
            }

            if(!Constants.expoConfig?.extra?.eas?.projectId) {
                alert('Project Id not found.');
                return;
            }

            token = (
                await Notifications.getExpoPushTokenAsync({
                  projectId: Constants.expoConfig.extra.eas.projectId,
                })
              ).data;

            return token;
        }
       
    }
    