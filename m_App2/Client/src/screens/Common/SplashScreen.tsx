import React, { useEffect } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenStyles } from '../../assets/styles/AppStyles';
import APIClient from '../../helpers/APIClient';
import { APIEndpoint } from '../../helpers/APIEndpoints';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    checkServerStatus();
    logDeveloperMode();
  }, []);

  const logDeveloperMode = () => {
    if (__DEV__) {
      console.log('Developer mode is enabled');
    } else {
      console.log('Developer mode is disabled');
    }
  };

  const navigateTo = (routeName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  };

  const checkUserLoggedState = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (!accessToken) {
        navigateTo('AuthSelect');
        return;
      }

      const response = await APIClient.sendRequest(
        'GET',
        APIEndpoint.UserDetails,
      );
      const responseText = await response.text();

      if (!response.ok || !responseText) {
        await AsyncStorage.multiRemove(['access_token', 'role_id']);
        navigateTo('AuthSelect');
        return;
      }

      const userData = JSON.parse(responseText);
      await AsyncStorage.setItem('role_id', String(userData.roleId));
      navigateTo('HomeScreen');
    } catch (err) {
      console.error('Error checking user login state:', err);
      navigateTo('AuthSelect'); // Fallback to login if any error occurs
    }
  };

  const checkServerStatus = async () => {
    try {
      const response = await APIClient.sendRequest('GET', APIEndpoint.Alive);
      if (response.ok) {
        await response.json();
        checkUserLoggedState();
      } else {
        Alert.alert(
          'SERVER ERROR',
          'Server is not responding. Please try again later.',
        );
      }
    } catch (err: any) {
      Alert.alert(
        'SERVER ERROR',
        'Server is not responding. Please try again later.',
      );
      setTimeout(() => {
        checkServerStatus();
      }, 10000);
    }
  };

  return (
    <SafeAreaView
      style={[ScreenStyles.container, styles.splashScreenContainer]}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/EchoCycle.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashScreenContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    width: '50%',
    height: '30%',
    backgroundColor: '#FFF',
  },
});

export default SplashScreen;
