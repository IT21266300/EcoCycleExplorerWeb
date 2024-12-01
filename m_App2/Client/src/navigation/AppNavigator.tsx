import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import MainHome from '../screens/Home/MainHome';
import RideTracking from '../screens/Tracking/RideTracking';

// Import all screens
import { 
  SplashScreen,
  LoginScreen, 
  SignUpScreen,
  OtpVerificationScreen,
  BottomTabView,
  ChangePasswordScreen,
  NotificationScreen
} from '../exports';

import AuthSelectScreen from '../screens/Login/AuthSelectScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AuthSelect" 
            component={AuthSelectScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShadowVisible: false
            }} 
          />
          <Stack.Screen 
  name="RideTracking" 
  component={RideTracking}
  options={{ 
    headerTitle: 'Track Ride',
    headerBackTitleVisible: false 
  }} 
/>
          <Stack.Screen 
            name="MainHome" 
            component={MainHome}
            options={{ headerShown: false }} 
            />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShadowVisible: false
            }} 
          />
          <Stack.Screen 
            name="SignUpSuccess" 
            component={LoginScreen}
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShadowVisible: false
            }} 
          />
          <Stack.Screen 
            name="HomeScreen" 
            component={BottomTabView}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="OtpVerification" 
            component={OtpVerificationScreen}
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: true,
              headerShadowVisible: false
            }} 
          />
          <Stack.Screen 
            name="ChangePassword" 
            component={ChangePasswordScreen}
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: false
            }} 
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationScreen}
            options={{ 
              headerTitle: 'Notifications',
              headerBackTitleVisible: false,
              headerTitleAlign: 'left',
              headerShadowVisible: false
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
