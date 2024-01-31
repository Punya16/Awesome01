import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import authService from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      setError('');

      // Implement your login logic (e.g., calling authService.login)
      const token = await authService.login(email, password);

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
      console.error('Login failed:', error.message);
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpPress = () => {
    setIsPressed(true);
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />

      {loading && <ActivityIndicator size="large" color="blue" />}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* SignUp button/link */}
      <TouchableOpacity
        onPress={handleSignUpPress}
        style={[styles.signUpButton, isPressed && styles.signUpButtonPressed]}
      >
        <Text style={[styles.signUpLink, isPressed && styles.signUpLinkPressed]}>New User? SignUp</Text>
      </TouchableOpacity>
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
  signUpButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  // signUpButtonPressed: {
  //   // Example: Change the background color when pressed
  //   backgroundColor: 'lightgray',
  // },
  signUpLink: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 1,
    fontSize: 16,
  },
  signUpLinkPressed: {
    // Example: Change the text color when pressed
    color: 'darkblue',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
