import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import authService from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information or perform any other initialization logic
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData(); // Example: Fetch user data from the server
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        // Handle error, possibly navigate back to login screen
        navigation.replace('Login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      // Implement your logout logic (e.g., calling authService.logout)
      // For demonstration, we'll assume there is a logout function in authService
      await authService.logout();

      // Navigate back to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Handle logout error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user && <Text>Welcome, {user.firstName}!</Text>}
      <Text>Welcome to the Home Screen!</Text>
      <Button title={loading ? "Logging Out..." : "Logout"} onPress={handleLogout} disabled={loading} />
    </View>
  );
};

export default HomeScreen;
