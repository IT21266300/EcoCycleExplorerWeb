import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ScreenStyles,
  SpaceStyles,
  TextStyles,
} from '../../assets/styles/AppStyles';
import { colors } from '../../assets/styles/Colors';
import { Apple, Google } from 'iconsax-react-native';

const AuthSelectScreen = ({ navigation }: any) => {
  // MARK: - Components
  const OtherAuthMethodsView = () => {
    return (
      <View style={[SpaceStyles.m8]}>
        <TouchableOpacity style={styles.socialButton}>
          <Google
            color={colors.PRIMARY_WHITE}
            size={30}
            style={{ marginLeft: 4 }}
            variant="Bold"
          />
          <Text style={[styles.buttonText]}>Continue with Google</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.socialButton}>
            <Apple
              color={colors.PRIMARY_WHITE}
              size={30}
              style={{ marginLeft: 4 }}
              variant="Bold"
            />
            <Text style={[styles.buttonText]}>Continue with Apple</Text>
          </TouchableOpacity>
        )}
        <View style={[styles.deviderView]}>
          <View style={[styles.deviderLine]} />
          <Text style={[styles.deviderText]}>or</Text>
          <View style={[styles.deviderLine]} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.socialButton}>
          <Text style={[styles.buttonText]}>Create account</Text>
        </TouchableOpacity>
        <Text style={[styles.privacyPolicyText]}>
          By signing up, you agree to the{' '}
          <Text
            style={[
              styles.privacyPolicyText,
              { color: colors.SUB_COLOR, fontWeight: 'bold' },
            ]}>
            Terms of Service{' '}
          </Text>
          and{' '}
          <Text
            style={[
              styles.privacyPolicyText,
              { color: colors.SUB_COLOR, fontWeight: 'bold' },
            ]}>
            Privacy Policy
          </Text>
          .
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[
            {
              marginVertical: 16,
            },
          ]}>
          <Text style={[styles.privacyPolicyText]}>
            Already have an account?{' '}
            <Text
              style={[
                styles.privacyPolicyText,
                { color: colors.SUB_COLOR, fontWeight: 'bold' },
              ]}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // MARK: - DOM
  return (
    <SafeAreaView style={[ScreenStyles.container]}>
      <View style={[styles.mainContainer]}>
        <Image
          style={[styles.logo]}
          source={require('../../assets/images/bicycle.png')}
        />
        <View style={[{ flexGrow: 1 }]} />
        <Text style={[styles.mainText]}>
          Reliable help for every task, right at your fingertips.
        </Text>
        <View style={[{ flexGrow: 1 }]} />
        <OtherAuthMethodsView />
      </View>
    </SafeAreaView>
  );
};

export default AuthSelectScreen;

const styles = StyleSheet.create({
  mainContainer: {
    ...ScreenStyles.subContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  mainText: {
    ...TextStyles.H1,
    textAlign: 'center',
    paddingVertical: 16,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  socialButton: {
    width: Dimensions.get('window').width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: colors.PRIMARY_BLACK,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    justifyContent: 'center',
    height: 55,
  },
  buttonText: {
    color: colors.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deviderText: {
    ...TextStyles.H6,
    color: colors.PRIMARY_LIGHT_GRAY,
    textAlign: 'center',
    justifyContent: 'center',
  },
  deviderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent: 'center',
  },
  privacyPolicyText: {
    ...TextStyles.H6,
    color: colors.PRIMARY_LIGHT_GRAY,
    textAlign: 'left',
    justifyContent: 'center',
    fontWeight: '700',
  },
});
