// AuthForm.js

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const token = await onSubmit(email, password);
      // Handle token, navigate, or perform any other actions based on your requirements
    } catch (error) {
      console.error('Authentication failed:', error.message);
      // Handle authentication error
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={buttonText} onPress={handleSubmit} />
    </View>
  );
};

export default AuthForm;
