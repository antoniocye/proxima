import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const PasswordField = ({ placeholder, onSubmitEditing }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
            placeholder={placeholder}
            onSubmitEditing={onSubmitEditing}
            onFocus={handleFocus}
            secureTextEntry={true}
            passwordRules={{ required: 'digit', minlength: '8' }}
            onBlur={handleBlur}
            style={[
                globalStyles.input,
                {  
                    borderWidth: isFocused ? 3 : 2, // Change border width on focus
                },
            ]}
        />
  );
};

export default PasswordField;
