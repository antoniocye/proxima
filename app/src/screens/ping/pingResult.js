import React from 'react';
import { SafeAreaView, Text, Image, ImageBackground, View, Platform} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AnimatedButton from '../../components/button';
import profileStyles from '../../styles/profileStyles';
import { getProfile } from '../../profiles';
import Chip from '../../components/chip';
export default function PingStartScreen({ route, navigation }) {

  

  const { user_id, message } = route.params;
  var profile = getProfile(user_id);

  return (
    <ImageBackground source={require('../../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.text}>you matched with</Text>
        <Text style={globalStyles.heading}>{profile.name}</Text>
        <Image source={profile.photos[0].uri} style={profileStyles.mainImage}/>
        <View style={profileStyles.row}>
          <Chip label={profile.age}/> 
          <Chip label={profile.pronouns}/>
        </View>
        <AnimatedButton title="ok" onPress={() => navigation.popToTop()}/>
      </SafeAreaView>
    </ImageBackground>
  );
}