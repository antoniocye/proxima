import { useGlobalUser } from '../App';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    const [location] = locations;
    console.log('hey', location);
    try {
        
    } catch (err) {
      console.error(err);
    }
});

export function BackgroundLocationService() {
    const { myUser, setMyUser } = useGlobalUser();

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {

                // Request permission to access location
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                console.log(location);

                // Start location updates
                await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
                    accuracy: Location.Accuracy.Highest,
                    distanceInterval: 1, // minimum change (in meters) between updates
                    deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
                    // foregroundService is how you get the task to be updated as often as would be if the app was open
                    foregroundService: {
                      notificationTitle: 'Using your location',
                      notificationBody: 'To turn off, go back to the app and switch something off.',
                    },
                });

                console.log('Location updates started');
            } catch (error) {
                console.error('Failed to start location updates', error);
            }
        })();

        return () => {
            isMounted = false;
            // Stop location updates when component unmounts
            Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
        };
    }, []); // Include dependencies if needed

    return null; // This component doesn't render anything
}
