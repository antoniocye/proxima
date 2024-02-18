import React from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, ScrollView, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../styles/globalStyles';
import photoPickerStyles from '../styles/photoPickerStyles'; 
import AnimatedButton from '../components/button';
import PhotoPicker from '../components/photopicker';
import { getProfile, updateProfile } from '../profiles';


export default function AddPhotosScreen({ route, navigation }) {

  const { name } = route.params;
  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      <SafeAreaView style={[globalStyles.backgroundImage]}>
        <View style = {{marginTop: 40}}><Progress.Bar progress={1} width={200} color={globalStyles.primaryColor}/></View>
          <View style={globalStyles.container}>
            <ScrollView>
              <Text style={globalStyles.heading}>add photos</Text>
              <Text style={globalStyles.text}>give us 3 photos that show who you are!</Text>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker afterPhotoSelected={(uri)=>{
                    console.log(uri);
                    var newProfile = getProfile(name);
                    newProfile.photos[0] = {uri:{uri}};
                    // updateProfile(name, newProfile);
                    console.log(getProfile(name));
                  }}/>
              </View>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker/>
              </View>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker/>
              </View>
              <AnimatedButton title="Finish" onPress={() => navigation.navigate("Onboarding Done")}/>
            </ScrollView>
          </View>
      </SafeAreaView>
    </ImageBackground>
  );
}