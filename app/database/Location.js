import { GlobalUser } from '../App';
import { useContext, useState } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const haversine = require('haversine');``
const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';


const PermissionsButton = () => {
    const [myUser, setMyUser] = useContext(GlobalUser);
    const [loc, setLoc] = useState();

    // TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data, error }) => {
    //     console.log("Here");

    //     if (error) {
    //     console.error(error);
    //     return;
    //     }
    //     const { locations } = data;
    //     [ new_loc ] = locations;
    //     if(loc && loc.coords){
    //         const start = {
    //             latitude: loc.coords.latitude,
    //             longitude: loc.coords.longitude
    //         }
        
    //         const end = {
    //             latitude: new_loc.coords.latitude,
    //             longitude: new_loc.coords.longitude
    //         }

    //         // If more than 1 meter away, update
    //         if (!haversine(start, end, {threshold: 1, unit: 'meter'})) {
    //             loc = new_loc;
    //             console.log(myUser, "harvsine passed")
    //             if(myUser){
    //                 console.log("Updated", loc);

    //                 myUser.changeUserPropertyInDatabase(
    //                     "location",
    //                     loc
    //                 )
    //                 console.log(myUser._userId);
    //             }
                
    //         }
    //     }
    //     else{
    //         loc = new_loc;
    //     }
    // });

    const requestPermissions = async () => {
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        console.log('f', foregroundStatus);
        const { status: backgroundStatus } = await Location.requestForegroundPermissionsAsync();

        if (foregroundStatus === 'granted' && backgroundStatus === 'granted') {
            setInterval(async () => {
                let curLoc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest,
                    activityType: Location.ActivityType.Fitness,
                });
                if(loc && loc.coords){
                    const start = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude
                    }
                
                    const end = {
                        latitude: curLoc.coords.latitude,
                        longitude: curLoc.coords.longitude
                    }
    
                    // If more than 1 meter away, update
                    setLoc(curLoc);
                    console.log(myUser, "harvsine passed")
                    if(myUser){
                        console.log("Updated", curLoc);

                        myUser.changeUserPropertyInDatabase(
                            "location",
                            curLoc
                        )
                    }
                }
                else{
                    setLoc(curLoc);
                }
            }, 10000);


            //const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
            //console.log('b', backgroundStatus);
            //if (backgroundStatus === 'granted') {
                
               
                // await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
                //     accuracy: Location.Accuracy.Highest,
                //     activityType: Location.ActivityType.Fitness,
                //     distanceInterval: 1, // minimum change (in meters) between updates
                //     timeInterval: 100,
                //     pausesUpdatesAutomatically: false,
                //     // foregroundService is how you get the task to be updated as often as would be if the app was open
                //     foregroundService: {
                //         notificationTitle: 'Using your location',
                //         notificationBody: 'To turn off, go back to the Proxima app and switch location updates off',
                //     }
                // });
            //}
        }
    };

    return (
        <View>
            <Button onPress={requestPermissions} title="Enable background location" />
        </View>
    )
};

export default PermissionsButton;