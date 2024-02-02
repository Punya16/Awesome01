import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api-w3qcv3aiha-el.a.run.app';

const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;

      // Store the token securely
      await authService.storeToken(token);

      return token;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  signup: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      const token = data.token;

      // Store the token securely
      await authService.storeToken(token);

      return token;
    } catch (error) {
      throw new Error('Signup failed');
    }
  },

  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Token storage failed');
    }
  },

  retrieveToken: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      throw new Error('Token retrieval failed');
    }
  },
};

export default authService;
