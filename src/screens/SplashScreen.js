import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation, isAuthenticated }) => {
  useEffect(() => {
    const screenToNavigate = isAuthenticated ? 'Home' : 'Login';

    const timeoutId = setTimeout(() => {
      navigation.replace(screenToNavigate);
    }, 2000);

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, [navigation, isAuthenticated]);

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
