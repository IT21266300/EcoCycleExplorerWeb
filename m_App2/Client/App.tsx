// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import { colors } from './src/assets/styles/Colors';

// // Screens
// import { ArrowLeft, ArrowLeft2, Menu } from 'iconsax-react-native';
// import { TouchableOpacity } from 'react-native';

// // Import all screens from index files
// import {
//   SplashScreen,
//   PrivacyPolicyScreen,
//   LoginScreen,
//   OtpVerificationScreen,
//   SignUpScreen,
//   SignUpSuccessScreen,
//   ChangePasswordScreen,
//   BottomTabView,
//   NotificationScreen,

// } from './src/exports/index.ts';
// import { AppNavigationParams } from './src/types/commonNavigationParams';

// import AuthSelectScreen from './src/screens/Login/AuthSelectScreen.tsx';

// const Stack = createNativeStackNavigator<AppNavigationParams>();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//       <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AuthSelect"
//           component={AuthSelectScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="PrivacyPolicy"
//           component={PrivacyPolicyScreen}
//           options={{
//             headerTitle: 'Privacy Policy',
//             headerTitleAlign: 'center',
//             headerStyle: { backgroundColor: colors.PRIMARY_COLOR },
//             statusBarColor: colors.PRIMARY_COLOR,
//           }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             headerTitle: '',
//             headerBackTitleVisible: false,
//             headerTintColor: colors.PRIMARY_COLOR,
//             headerShadowVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           options={{
//             headerTitle: '',
//             headerBackTitleVisible: false,
//             headerTintColor: colors.PRIMARY_COLOR,
//             headerShadowVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="OtpVerification"
//           component={OtpVerificationScreen}
//           options={{
//             headerTitle: '',
//             headerBackTitleVisible: true,
//             headerTintColor: colors.PRIMARY_COLOR,
//             headerTitleAlign: 'center',
//             headerStyle: { backgroundColor: colors.PRIMARY_WHITE },
//             statusBarColor: colors.PRIMARY_COLOR,
//             headerShown: true,
//             headerShadowVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="HomeScreen"
//           component={BottomTabView}
//           options={{
//             headerShown: false,
//             headerBackTitleVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="SignUpSuccess"
//           component={SignUpSuccessScreen}
//           options={{
//             headerShown: false,
//             headerBackTitleVisible: false,
//           }}
//         />
//         {/*Change Password Screen*/}
//         <Stack.Screen
//           name="ChangePassword"
//           component={ChangePasswordScreen}
//           options={{
//             headerTitle: '',
//             headerBackTitleVisible: false,
//             headerTintColor: colors.PRIMARY_COLOR,
//             statusBarColor: colors.PRIMARY_COLOR,
//           }}
//         />
//         <Stack.Screen
//           options={{
//             headerTitle: 'Notifications',
//             headerBackTitleVisible: false,
//             headerTintColor: colors.PRIMARY_BLACK,
//             headerTitleAlign: 'left',
//             headerStyle: { backgroundColor: colors.PRIMARY_WHITE },
//             statusBarColor: colors.PRIMARY_WHITE,
//             headerShadowVisible: false,
//             headerShown: true,
//           }}
//           name="Notifications"
//           component={NotificationScreen}
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;



import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return <AppNavigator />;
}

export default App;
