import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, Platform, Text } from 'react-native';

const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await onSubmit(email, password);
      // Handle token, navigate, or perform any other actions based on your requirements
    } catch (error) {
      console.error('Authentication failed:', error.message);
      setError('Authentication failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}
    >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Button title={loading ? "Authenticating..." : buttonText} onPress={handleSubmit} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="blue" />}
      
      {error ? <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>{error}</Text> : null}
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
