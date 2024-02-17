import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './database/Profile.js';
import { init, auth, db } from './database/Init.js'

export default function App() {
  for(i = 0; i < 5; i++){
    console.log("----------------------------------------");
  }
  
  result = init();
  user = new Profile({name:"Antonio", email:"antoniokambire@gmail.com", password:"Hello123"});
  
  console.log("We have finished profile creation");

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
