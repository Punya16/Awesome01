// AuthForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import AuthButton from './AuthButton';

const AuthForm = ({ onSubmit, buttonText, isSignup, loading, error, navigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    try {
      await onSubmit(email, password);
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}
    >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <AuthButton title={loading ? (isSignup ? "Signing Up..." : "Authenticating...") : buttonText} onPress={handleSubmit} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="blue" />}
      
      {error ? <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>{error}</Text> : null}

      {isSignup && (
        // Link or button to navigate back to LoginScreen
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={{ textAlign: 'center', color: 'blue', marginTop: 10 }}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
