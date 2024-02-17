import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect} from 'react';
import * as Location from 'expo-location';

/*
const start = {
  latitude: currentLocation.coords.latitude,
  longitude: currentLocation.coords.longitude
}
const end = {
  latitude: location.coords.latitude,
  longitude: location.coords.longitude
}

if (haversine(start, end, {threshold: 1, unit: 'meter'}) == false) {
  setLocation(currentLocation);
  console.log("Changed!!!");
}

- Check altitudes are within __ meters
- Use haversine to see if database location is different from new location
- When it changes, check if within __ meters of another person
*/

export default function App() {
  const [location, setLocation] = useState();
  const haversine = require('haversine');
  
  useEffect(() => {
      const getPermissions = async () => { 
        let { status } = await Location.requestForegroundPermissionsAsync();
  
        if (status !== 'granted') {
          console.log("Please grant location permissions");
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        console.log("Longitude:");
        console.log(location.coords.longitude);
        console.log("Latitude:");
        console.log(location.coords.latitude);
      }
 
      getPermissions();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text> Hello </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
