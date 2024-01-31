const BASE_URL = 'https://api-w3qcv3aiha-el.a.run.app';

const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
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
      return data.token;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  signup: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
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
      return data.token;
    } catch (error) {
      throw new Error('Signup failed');
    }
  },

  // You can add other helper functions, such as storing and retrieving tokens, here

  // Example: Storing token using AsyncStorage
  storeToken: async (token) => {
    // Implement your token storage logic here (e.g., AsyncStorage)
    // You may need to install AsyncStorage using 'npm install @react-native-async-storage/async-storage'
    // Replace the following line with your actual storage logic
    await AsyncStorage.setItem('token', token);
  },

  // Example: Retrieving token from AsyncStorage
  retrieveToken: async () => {
    // Implement your token retrieval logic here (e.g., AsyncStorage)
    // Replace the following line with your actual retrieval logic
    const token = await AsyncStorage.getItem('token');
    return token;
  },
};

export default authService;
