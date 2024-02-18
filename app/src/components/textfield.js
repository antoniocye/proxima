import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const TextField = ({ placeholder, onSubmitEditing, onChange, keyboardType, isPassword = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        autoCapitalize='none'
        style={[
          globalStyles.input,
          {  
            borderWidth: isFocused ? 3 : 2, // Change border width on focus
          },
        ]}
      />
  );
};

export default TextField;
