import React from 'react';
import { SafeAreaView, Text, TextInput, ImageBackground, View} from 'react-native';
import globalStyles from '../styles/globalStyles';
import AnimatedButton from '../components/button';
import PhotoPicker from '../components/photopicker';
export default function AddPhotosScreen({ navigation }) {
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.heading}>add photos</Text>
        <Text style={globalStyles.text}>pick a photo from the picker</Text>
        <View style={globalStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <View style={globalStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <View style={globalStyles.photoPickerRow}>
            <PhotoPicker/>
            <PhotoPicker/>
        </View>
        <AnimatedButton title="go back" onPress={() => navigation.goBack()}/>
      </SafeAreaView>
    </ImageBackground>
  );
}