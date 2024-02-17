import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const TextField = ({ placeholder, onSubmitEditing, onChange, keyboardType}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
