import React, {useState, useContext} from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground, ScrollView, Platform, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import globalStyles from '../styles/globalStyles';
import photoPickerStyles from '../styles/photoPickerStyles'; 
import AnimatedButton from '../components/button';
import PhotoPicker from '../components/photopicker';
import { getProfile, updateProfile } from '../profiles';
import { GlobalUser } from '../../App';
import { createAlert } from '../../database/authUtil';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getApp } from "firebase/app";

export default function AddPhotosScreen({ route, navigation }) {
  const firebaseApp = getApp();

  const [ picUri1, setPicUri1 ] = useState();
  const [ picUri2, setPicUri2 ] = useState();
  const [ picUri3, setPicUri3 ] = useState();

  const [ loading, setLoading ] = useState(false);

  const [myUser, setMyUser] = useContext(GlobalUser);

  async function trySend(){
    if(picUri1 && picUri2 && picUri3){
      setLoading(true);
      console.log("Sending photos to database");

      const regex = /[^\/]+$/;
      const match1 = picUri1.match(regex);
      const match2 = picUri2.match(regex);
      const match3 = picUri3.match(regex);

      let file1Name, file2Name, file3Name;
      if (match1) {
        file1Name = match1[0];
        console.log(file1Name); // Output: file-name.extension
      } else {
        createAlert("Oops!", "Please upload a valid photo");
        setLoading(false);
        return;
      }

      if (match2) {
        file2Name = match2[0];
        console.log(file2Name); // Output: file-name.extension
      } else {
        createAlert("Oops!", "Please upload a valid photo");
        setLoading(false);
        return;
      }

      if (match3) {
        file3Name = match3[0];
        console.log(file3Name); // Output: file-name.extension
      } else {
        createAlert("Oops!", "Please upload a valid photo");
        setLoading(false);
        return;
      }

        try {
          const response = await fetch(picUri1);
          console.log("Fetched");
          const blob = await response.blob(); // Convert to blob
          console.log("Converted blob");
          const storage = getStorage();

          const file1Name = picUri1.match(/[^\/]+$/)[0];
          const file2Name = picUri2.match(/[^\/]+$/)[0];
          const file3Name = picUri3.match(/[^\/]+$/)[0]; 

          const image1Ref = ref(storage, myUser._userId + "/images/" + file1Name);
          const image2Ref = ref(storage, myUser._userId + "/images/" + file2Name);
          const image3Ref = ref(storage, myUser._userId + "/images/" + file3Name);

          console.log("Uploading");
          const snapshot1 = await uploadBytes(image1Ref, blob);
          const downloadURL1 = await getDownloadURL(image1Ref);

          const snapshot2 = await uploadBytes(image2Ref, blob);
          const downloadURL2 = await getDownloadURL(image2Ref);

          const snapshot3 = await uploadBytes(image3Ref, blob);
          const downloadURL3 = await getDownloadURL(image3Ref);

          console.log("Done uploading");
          await myUser.changeUserPropertyInDatabase("photos", [downloadURL1, downloadURL2, downloadURL3]);
          navigation.navigate('Onboarding Done');

        } catch (error) {
          console.error("Operation failed", error);
          // Handle any errors that occurred during the fetch, upload, or URL retrieval
          createAlert("Oops!", "There was an error uploading your photos. Please try again.");
          setLoading(true);
        }

    } else {
      createAlert("Oops!", "We require that you upload 3 photos!");
    }
  }
      

  // Access passed data using route.params
  return (
    <ImageBackground source={require('../../assets/img/background.png')} style={globalStyles.backgroundImage}>

      {loading ? (
        <SafeAreaView style={globalStyles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      ) : (
        
        <SafeAreaView style={[globalStyles.backgroundImage]}>
          <View style = {{marginTop: 40}}>
            <Progress.Bar progress={0.8} width={200} color={globalStyles.primaryColor}/>
            <Text style={globalStyles.text}>80%</Text>
          </View>
          <View style={globalStyles.container}>
            <ScrollView>
              <Text style={globalStyles.heading}>add photos</Text>
              <Text style={globalStyles.text}>give us 3 photos that show who you are!</Text>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker afterPhotoSelected={(uri)=>{
                    console.log(uri);
                    setPicUri1(uri);
                  }}/>
              </View>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker afterPhotoSelected={(uri)=>{
                    console.log(uri);
                    setPicUri2(uri);
                  }}/>
              </View>
              <View style={photoPickerStyles.photoPickerRow}>
                  <PhotoPicker afterPhotoSelected={(uri)=>{
                    console.log(uri);
                    setPicUri3(uri);
                  }}/>
              </View>
              <AnimatedButton title="Finish" onPress={() => trySend()}/>
            </ScrollView>
          </View>
      </SafeAreaView>

      )}
      
    </ImageBackground>
  );
}