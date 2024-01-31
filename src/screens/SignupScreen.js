// SignupScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AuthForm from '../components/AuthForm';
import authService from '../services/authService';

const SignupScreen = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSignup = async (userData) => {
    try {
      const token = await authService.signup(userData);

      // Handle token, navigate, or perform any other actions based on your requirements
      if (token) {
        // Store the token securely (e.g., AsyncStorage or react-native-keychain)
        // Replace the following line with your token storage logic

        // Example using react-native-keychain:
        await authService.storeToken(token);

        // Navigate to the Home screen or any other screen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);

      // Handle signup error
      // You might want to display an alert or provide user feedback
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <AuthForm onSubmit={handleSignup} buttonText="Sign Up" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignupScreen;
