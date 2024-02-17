import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../styles/globalStyles';

export default function PhotoPicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={[globalStyles.photoPicker]} onPress={pickImage}>
      {image ? <Image source={{ uri: image }} style={globalStyles.photoPickerImage} /> : <Text style={globalStyles.photoPickerText}>+</Text>}
    </Pressable>
  );
}
