import React from 'react';
import { View, Text, Button } from 'react-native';
import authService from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Implement your logout logic (e.g., calling authService.logout)
      // For demonstration, we'll assume there is a logout function in authService
      await authService.logout();

      // Navigate back to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Handle logout error
    }
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
