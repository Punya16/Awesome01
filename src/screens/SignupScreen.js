import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import AuthButton from '../components/AuthButton';
import authService from '../services/authService';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  //const [middleName, setMiddleName] = useState('');
  //const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError('');

      // Implement your signup logic (e.g., calling authService.signup)
      const token = await authService.signup({
        firstName,
        //middleName,
        //lastName,
        email,
        phone,
        password,
      });

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
      setError('Signup failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Use the correct screen name you defined in your navigation stack
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}
    >
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      {/* <TextInput placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} /> */}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <AuthButton title={loading ? "Signing Up..." : "Signup"} onPress={handleSignup} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="blue" />}
      
      {error ? <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>{error}</Text> : null}

      {/* Link or button to navigate back to LoginScreen */}
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={{ textAlign: 'center', color: 'blue', marginTop: 10 }}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
