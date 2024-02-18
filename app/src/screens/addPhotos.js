import React from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../styles/globalStyles';
import photoPickerStyles from '../styles/photoPickerStyles'; 
import AnimatedButton from '../components/button';
import PhotoPicker from '../components/photopicker';
export default function AddPhotosScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      <SafeAreaView style={[globalStyles.container, {justifyContent:'flex-start'}]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={1} width={200} color={globalStyles.primaryColor}/></View>
        <Text style={globalStyles.heading}>add photos</Text>
        <Text style={globalStyles.text}>pick a photo from the picker</Text>
        <View style={photoPickerStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <View style={photoPickerStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <View style={photoPickerStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <AnimatedButton title="Finish" onPress={() => navigation.navigate("Onboarding Done")}/>
      </SafeAreaView>
    </ImageBackground>
  );
}