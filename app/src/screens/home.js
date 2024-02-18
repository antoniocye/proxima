import React from 'react';
import { View, Button, Text, Pressable, ImageBackground, FlatList, ScrollView } from 'react-native';
import globalStyles from '../styles/globalStyles';
import CustomButton from '../components/button';
import AnimatedButton from '../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation , onLayoutRootView}) {
  return (
    <View style={globalStyles.backgroundImage} onLayout={onLayoutRootView}>
      <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
        <SafeAreaView>
        <View style={globalStyles.container}>
          <ScrollView>
            <Text style={globalStyles.heading}>pick a page</Text>
            <Text style={globalStyles.text}>experiment with ultra-custom designed user experiences that can enable new levels of customer satisfaction</Text>
            <AnimatedButton title="details" onPress={() => navigation.navigate('Details')} />
            <AnimatedButton title="login" onPress={() => navigation.navigate('Login')} />
            <AnimatedButton title="sign up" onPress={() => navigation.navigate('Sign Up')} />
            <AnimatedButton title="add photos" onPress={() => navigation.navigate('Add Photos', {name: 'Josh'})} />
            <AnimatedButton title="take a selfie" onPress={() => navigation.navigate('Camera')} />
            <AnimatedButton title="ping" onPress={() => navigation.navigate('Ping Start', {user_id: "Tanvir"})} />
            <AnimatedButton title="main profile page" onPress={() => navigation.navigate('Main')} />
            <AnimatedButton title="onboard" onPress={() => navigation.navigate('Onboarding Name')} />
          </ScrollView>
        </View>
        </SafeAreaView>
      </ImageBackground>

    </View>
  );
}