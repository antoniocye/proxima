import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, createRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/home";
import DetailsScreen from "./src/screens/details";
import notifs from "./utils/notifs";
import { navigationRef } from './utils/RootNavigation';

const Stack = createNativeStackNavigator();

/*
 * Only add navigation points to this file, handle navigation in the files themselves
 */

function App() {

  return (
    <NavigationContainer ref={navigationRef} onReady={notifs()}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
