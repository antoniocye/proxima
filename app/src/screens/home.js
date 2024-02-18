import React, { useContext, useEffect } from 'react';
import { View, Button, Text, Pressable, ImageBackground } from 'react-native';
import globalStyles from '../styles/globalStyles';
import CustomButton from '../components/button';
import AnimatedButton from '../components/button';
import PermissionsButton from '../../database/Location';
import { GlobalUser } from '../../App';

export default function HomeScreen({ navigation , onLayoutRootView}) {
  const [myUser, setMyUser] = useContext(GlobalUser);

  useEffect(() => {
      setInterval(async () => {
        if(myUser){
          await myUser.changeUserPropertyInDatabase("name", "tonyk");
          await myUser.setListenerPropertyOnChange("name");
          console.log(myUser);
        }
      }, 1000);
      
    }, []
  )
  
  return (
    <View style={globalStyles.backgroundImage} onLayout={onLayoutRootView}>
      <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.heading}>pick a page</Text>
          <Text style={globalStyles.text}>experiment with ultra-custom designed user experiences that can enable new levels of customer satisfaction</Text>
          <AnimatedButton title="details" onPress={() => navigation.navigate('Details')} />
          <AnimatedButton title="login" onPress={() => navigation.navigate('Login')} />
          <AnimatedButton title="sign up" onPress={() => navigation.navigate('Sign Up')} />
          <AnimatedButton title="add photos" onPress={() => navigation.navigate('Add Photos')} />
          <AnimatedButton title="take a selfie" onPress={() => navigation.navigate('Camera')} />
          <AnimatedButton title="ping" onPress={() => navigation.navigate('Ping Start', {user_id: "asanshay"})} />
          <PermissionsButton/>
        </View>
      </ImageBackground>

    </View>
  );
}