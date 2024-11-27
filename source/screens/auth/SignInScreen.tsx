import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { AppDimensions, logo } from '../../helpers/AppSettings';
import { useAppTheme } from '../../hooks/useAppTheme';
import { setUser } from '../../redux/UserReducer';
import { ScreenStyles } from '../../styles/AppStyles';
import Typography from '../../styles/Typography';
import { CustomThemeType } from '../../themes/theme';
import { SocialLoginView } from './SIgnUpScreen';

const SignInScreen = ({navigation}: any) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  //MARK: - State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //MARK: LifeCycle
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(colors.BG_COLOR);
  }, [colors.BG_COLOR]);

  //MARK: - SignIn Function
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const firebaseUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const userData = {
        uid: firebaseUser.user.uid,
        displayName: firebaseUser.user.displayName,
        email: firebaseUser.user.email,
        photoURL: firebaseUser.user.photoURL,
        providerId: firebaseUser.user.providerData[0]?.providerId || 'password',
        googleUserInfo: {
          idToken: null,
          accessToken: null,
          serverAuthCode: null,
        },
      };

      // Dispatch to Redux
      dispatch(setUser(userData));
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }

      Alert.alert('Sign-In Error', errorMessage);
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

  const ForgotPasswordArea = () => {
    return (
      <TouchableOpacity
        style={[styles.forgotPasswordContainer]}
        activeOpacity={0.6}>
        <Text style={[styles.forgotPasswordText]}>Forgot Password?</Text>
      </TouchableOpacity>
    );
  };

  const ChangeSIgnMethod = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'SignUp'}],
          });
        }}
        style={[styles.signMethodContainer]}
        activeOpacity={0.6}>
        <Text style={[styles.signMethodText]}>
          Don't have an account?{' '}
          <Text style={[styles.signMethodSubText]}>Sign Up</Text>
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
      <View style={[ScreenStyles.subContainer]}>
        <Image style={[styles.logo]} source={logo()} />
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title]}>Sign In</Text>
          <Text style={[styles.subTitle]}>
            Sign in to your account to continue exploring and booking your next
            adventure.
          </Text>
        </View>
        <SocialLoginView />
        <OrDivider />
        <CustomTextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          leftIcon="account-circle"
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
        <ForgotPasswordArea />
        <PrimaryButton
          title="Sign In"
          onPress={handleSignIn}
          style={{marginTop: 16}}
        />
        <ChangeSIgnMethod />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
      marginVertical: 12,
      alignItems: 'center',
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
