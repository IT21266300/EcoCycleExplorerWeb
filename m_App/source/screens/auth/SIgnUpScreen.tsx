import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {PrimaryButton} from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {AppDimensions, logo} from '../../helpers/AppSettings';
import {useAppTheme} from '../../hooks/useAppTheme';
import {setUser} from '../../redux/UserReducer';
import {ScreenStyles} from '../../styles/AppStyles';
import Typography from '../../styles/Typography';
import {CustomThemeType} from '../../themes/theme';
import GoogleSigninUtils from '../../utils/GoogleSignin';

const SignUpScreen = ({navigation}: any) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  //MARK: - State
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // MARK: SignUP
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });

        const userData = {
          uid: userCredential.user.uid,
          displayName: `${firstName} ${lastName}`,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          providerId:
            userCredential.user.providerData[0]?.providerId || 'password',
          googleUserInfo: {
            idToken: null,
            accessToken: null,
            serverAuthCode: null,
          },
        };

        dispatch(setUser(userData));
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  //MARK: - Components

  const OrDivider = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 16,
        }}>
        <View
          style={{flex: 1, height: 1, backgroundColor: colors.BorderColor}}
        />
        <Text style={{marginHorizontal: 8, color: colors.SubText}}>OR</Text>
        <View
          style={{flex: 1, height: 1, backgroundColor: colors.BorderColor}}
        />
      </View>
    );
  };

  const ChangeSIgnMethod = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
        }}
        style={[styles.signMethodContainer]}
        activeOpacity={0.6}>
        <Text style={[styles.signMethodText]}>
          Already have an account?{' '}
          <Text style={[styles.signMethodSubText]}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  //MARK: - Render
  return (
    <SafeAreaView
      style={[
        ScreenStyles.container,
        {
          backgroundColor: colors.BG_COLOR,
        },
      ]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[ScreenStyles.subContainer]}>
        <Image style={[styles.logo]} source={logo()} />
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title]}>Sign Up</Text>
          <Text style={[styles.subTitle]}>
            Join our community and experience a seamless travel experience.
          </Text>
        </View>
        <SocialLoginView />
        <OrDivider />
        <CustomTextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          leftIcon="account-circle"
          rightText={`${firstName?.length}/100`}
          type="outlined"
          textInputOtherProps={{
            maxLength: 100,
            keyboardType: 'name-phone-pad',
          }}
          placeholder="Enter your first name"
        />
        <CustomTextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          leftIcon="account-circle"
          rightText={`${lastName?.length}/100`}
          type="outlined"
          textInputOtherProps={{
            maxLength: 100,
            keyboardType: 'name-phone-pad',
          }}
          placeholder="Enter your last name"
        />
        <CustomTextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          leftIcon="email"
          rightText={`${email?.length}/50`}
          type="outlined"
          textInputOtherProps={{
            maxLength: 50,
            keyboardType: 'email-address',
          }}
          placeholder="Enter your email address"
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          leftIcon="lock"
          type="outlined"
          secureTextEntry
          placeholder="Enter your password"
        />
        <CustomTextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          leftIcon="lock"
          type="outlined"
          secureTextEntry
          placeholder="Confirm your password"
        />
        <PrimaryButton
          title="Sign Up"
          onPress={handleSignUp}
          style={{marginTop: 16}}
        />
        <ChangeSIgnMethod />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    titleContainer: {
      paddingVertical: 16,
    },
    title: {
      ...Typography.h1Bold,
      color: colors.PrimaryText,
    },
    subTitle: {
      ...Typography.bodyDefaultRegular,
      color: colors.SubText,
    },
    logo: {
      width: AppDimensions.width * 0.9,
      resizeMode: 'contain',
    },
    socialLoginContainer: {
      width: '100%',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderColor: colors.BorderColor,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      flexDirection: 'row',
      gap: 12,
    },
    googleIcon: {
      resizeMode: 'cover',
      width: 28,
      height: 28,
      padding: 12,
    },
    forgotPasswordText: {
      ...Typography.bodyDefaultRegular,
      color: colors.SubText,
      textAlign: 'right',
    },
    forgotPasswordContainer: {
      marginVertical: 12,
      alignItems: 'flex-end',
    },
    signMethodContainer: {
      marginTop: 12,
      alignItems: 'center',
      marginBottom: 32,
    },
    signMethodText: {
      ...Typography.bodyDefaultRegular,
      color: colors.SubText,
      textAlign: 'center',
    },
    signMethodSubText: {
      ...Typography.bodyDefaultBold,
      color: colors.CommonBackground,
      textAlign: 'center',
    },
  });
export default SignUpScreen;

export const SocialLoginView: React.FC<any> = ({navigation}) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);

  // Google Sign-In
  const handleSignIn = async () => {
    try {
      const {userInfo, firebaseUser} = await GoogleSigninUtils.signIn();
      console.log('Google User Info:', userInfo);
      console.log('Firebase User Info:', firebaseUser);
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignIn}
      activeOpacity={0.6}
      style={styles.socialLoginContainer}>
      <Image
        style={styles.googleIcon}
        source={require('../../images/googleIcon.png')}
      />
      <Text style={{color: colors.PrimaryText}}>Sign Up with Google</Text>
    </TouchableOpacity>
  );
};
