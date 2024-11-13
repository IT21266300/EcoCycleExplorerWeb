import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  ScreenStyles,
  SpaceStyles,
  TextStyles,
} from '../../assets/styles/AppStyles';
import { colors } from '../../assets/styles/Colors';
import { ButtonWithoutIcon } from '../../components/Button.tsx';
import PasswordInputField from '../../components/TextInput/PasswordInputField.tsx';
import ValidationLabel from '../../components/ValidationLabel.tsx';
import APIClient from '../../helpers/APIClient.tsx';
import { APIEndpoint } from '../../helpers/APIEndpoints.tsx';
import CustomTextInput from '../../components/TextInput/CustomTextInput.tsx';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [didSubmit, setSubmit] = useState(false);

  function signInValidation() {
    setSubmit(true);
    if (!email || !password) {
      return;
    }

    signInNetworkRequest();
  }
  // MARK: Network Requests
  function signInNetworkRequest() {
    let requestModel = {
      email: email,
      password: password,
    };

    APIClient.sendRequest('POST', APIEndpoint.Login, requestModel)
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          const error = await response.json();
          // Alert.alert('Alert', error.message);
          if (error.message == 'Please Verify your account first') {
            Alert.alert('Alert', error.message, [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('OtpVerification', { email: email }),
              },
            ]);
          } else {
            Alert.alert('Alert', error.message);
          }
        }
      })
      .then(response => {
        if (response) {
          AsyncStorage.setItem('access_token', response.token);
          AsyncStorage.setItem('role_id', String(response.roleId));
          // Reset the navigation stack to prevent going back to the login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        }
      })
      .catch((err: any) => {
        console.log('🔴 Login Error: ', err);
      });
  }

  // MARK: Components
  const HeaderView = () => {
    return (
      <View>
        <Text style={[styles.MainTitle]}> Sign In</Text>
        <Text style={[styles.subTitle]}>
          Enter your email address and password.
        </Text>
      </View>
    );
  };

  const SignUpView = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 8,
        }}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.subText]}>Don't you have an account?</Text>
        <Text
          style={[
            styles.subText,
            { color: colors.SUB_COLOR, fontWeight: 'bold' },
          ]}>
          {' '}
          Sign up
        </Text>
      </TouchableOpacity>
    );
  };

  const SignInButtonView = () => {
    return (
      <ButtonWithoutIcon
        onPress={() => signInValidation()}
        buttonText="Sign In"
        btnColor={colors.PRIMARY_COLOR}
        color={colors.PRIMARY_WHITE}
      />
    );
  };

  // MARK: DOM
  return (
    <SafeAreaView style={ScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          ScreenStyles.subContainer,
          { justifyContent: 'center', flexGrow: 1 },
        ]}>
        <View style={[SpaceStyles.m4]}>
          <HeaderView />
          <CustomTextInput
            label="Email"
            placeholder={'Enter email address'}
            value={email}
            onChangeText={setEmail}
            TextInputCustomProps={{
              keyboardType: 'email-address',
              autoComplete: 'email',
            }}
            isValidationEnabled={didSubmit}
            validation={email === ''}
            validationMessage="Email is required"
          />
          <PasswordInputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isValidationEnabled={didSubmit}
            validation={password === ''}
            validationMessage="Password is required"
            validationTextStyle={{ color: 'red' }}
          />
          <SignInButtonView />
          <SignUpView />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  MainTitle: {
    ...TextStyles.H1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    ...TextStyles.H6,
    textAlign: 'center',
    color: colors.PRIMARY_LIGHT_GRAY,
    marginBottom: 16,
    fontWeight: 'medium',
  },
  subText: {
    ...TextStyles.H6,
    color: colors.PRIMARY_LIGHT_GRAY,
    textAlign: 'left',
    justifyContent: 'center',
    fontWeight: '700',
  },
});
