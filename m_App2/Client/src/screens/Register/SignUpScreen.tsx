import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
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
import { Dropdown } from 'react-native-element-dropdown';
import CustomTextInput from '../../components/TextInput/CustomTextInput.tsx';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;

const SignUpScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [didSubmit, setSubmit] = useState(false);
  const [gender, setGender] = useState<string>();
  const [middleName, setMiddleName] = useState('');

  function signUpValidation() {
    setSubmit(true);
    // Email and Password Regex
    //Email :- example@example.com
    //Password :- Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character

    // MARK: Validations
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return;
    }
    if (
      !emailRegex.test(email) ||
      !passwordRegex.test(password) ||
      password != confirmPassword
    ) {
      Alert.alert('Alert', 'Please enter valid details.');
      return;
    }

    signUpNetworkRequest();
  }

  function signUpNetworkRequest() {
    setLoading(true);

    let requestModel = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: password,
      gender: gender,
      middleName: middleName,
    };

    APIClient.sendRequest('POST', APIEndpoint.Register, requestModel)
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          setLoading(false);
          const error = await response.json();
          Alert.alert('SignUp Message', error.message);
        }
      })
      .then(response => {
        if (response) {
          navigation.navigate('OtpVerification', { email });
        }
      })
      .catch((err: any) => {
        console.log('🔴 Login Error: ', err);
      });
  }

  // MARK: DOM
  return (
    <SafeAreaView style={ScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[ScreenStyles.subContainer]}>
        <View style={SpaceStyles.m16}>
          <View style={SpaceStyles.m4}>
            <Text style={[styles.MainTitle]}>EchoCycle SignUp</Text>
            <Text style={[styles.subTitle]}>
              Enter your email and password to continue.
            </Text>
          </View>
          <View style={SpaceStyles.m16}>
            <Animated.View>
              <CustomTextInput
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholder={'Enter Your First Name'}
                isValidationEnabled={didSubmit}
                validationMessage="Please enter your first name"
                validation={!firstName}
              />
              <CustomTextInput
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholder={'Enter Your Last Name'}
                isValidationEnabled={didSubmit}
                validationMessage="Please enter your last name"
                validation={!lastName}
              />
              <CustomTextInput
                label="Other Name (Optional)"
                value={middleName}
                onChangeText={setMiddleName}
                placeholder={'Enter Your Middle Name'}
              />
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder={'Enter Your Email'}
                TextInputCustomProps={{
                  autoCapitalize: 'none',
                  keyboardType: 'email-address',
                }}
                isValidationEnabled={didSubmit}
                validationMessage="Please enter your email"
                validation={!emailRegex.test(email)}
              />
              <CustomTextInput
                label="Mobile"
                value={mobile}
                onChangeText={setMobile}
                placeholder={'Enter Your Mobile'}
                TextInputCustomProps={{
                  keyboardType: 'phone-pad',
                  maxLength: 10,
                }}
                isValidationEnabled={didSubmit}
                validationMessage="Please enter your mobile number"
                validation={mobile.length < 10}
              />
              <Dropdown
                placeholder="Select Your Gender"
                data={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
                style={styles.dropdown}
                labelField="label"
                valueField="value"
                value={gender}
                onChange={(item: any) => setGender(item.value)}
              />
            </Animated.View>
            <Animated.View>
              <PasswordInputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder={'Enter Your Password'}
                validationMessage="Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one number and one special character (@,#)."
                isValidationEnabled={didSubmit}
                validation={!passwordRegex.test(password)}
              />
              <PasswordInputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={'Retype Password'}
                isValidationEnabled={didSubmit}
                validationMessage="Password does not match"
                validation={password != confirmPassword}
              />
            </Animated.View>
            <View style={[SpaceStyles.m4, styles.instructionContainer]}>
              <Text style={[styles.instructionText]}>
                • Password must be at least 8 characters long.
              </Text>
              <Text style={[styles.instructionText]}>
                • Include at least one lowercase letter, one uppercase letter
                and one number.
              </Text>
              <Text style={[styles.instructionText]}>
                • Include at least one special character (@,#).
              </Text>
            </View>
          </View>

          {loading && (
            <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
          )}
          {!loading && (
            <ButtonWithoutIcon
              onPress={signUpValidation}
              buttonText="Next"
              btnColor={colors.PRIMARY_COLOR}
              color="#FFF"
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.THEME_GRAY,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 32,
    gap: 10,
    paddingLeft: 20,
  },
  instructionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    borderRadius: 8,
    paddingHorizontal: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.THEME_GRAY,
  },
  instructionText: {
    ...TextStyles.Small,
    color: colors.PRIMARY_GRAY,
    fontWeight: 'regular',
  },
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
});
