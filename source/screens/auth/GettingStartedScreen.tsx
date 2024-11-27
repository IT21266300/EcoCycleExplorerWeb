import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PrimaryButton, SecondaryButton } from '../../components/CustomButton';
import { useAppTheme } from '../../hooks/useAppTheme';
import Typography from '../../styles/Typography';
import { CustomThemeType } from '../../themes/theme';

const GettingStartedScreen = ({navigation}: any) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);

  //MARK: - LifeCycle

  //MARK: - Render
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <ImageBackground
        source={require('../../images/gettingStarted.png')}
        style={[styles.container]}>
        <View>
          <View style={{flexGrow: 1}} />
          <Text style={[styles.mainText]}>
            Ready to Embark on Your Next Journey?
          </Text>
          <Text style={[styles.subText]}>
            Join thousands of travelers who trust Wander Mate for seamless
            exploration and quick bookings. Let’s make your next adventure
            unforgettable.
          </Text>
          <View style={{flexGrow: 1}} />
          <View>
            <PrimaryButton
              title={'Sign In'}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
            <View style={{height: 12}} />
            <SecondaryButton
              title={'Create an Account'}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
            <Text style={[styles.privacyPolicyText]}>
              By signing in, you agree to our{' '}
              <Text style={[styles.highlightText]}>Terms of Service</Text> and{' '}
              <Text style={[styles.highlightText]}>Privacy Policy.</Text>
            </Text>
          </View>
          <View style={{flexGrow: 0.4}} />
        </View>
      </ImageBackground>
    </>
  );
};

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
    },
    mainText: {
      ...Typography.h1Bold,
      color: colors.OnCommonBackgroundText,
      textAlign: 'center',
    },
    subText: {
      ...Typography.bodyDefaultRegular,
      color: colors.OnCommonBackgroundSubText,
      textAlign: 'center',
    },
    privacyPolicyText: {
      ...Typography.bodyMediumBold,
      color: colors.OnCommonBackgroundSubText,
      textAlign: 'center',
      marginTop: 12,
    },
    highlightText: {
      ...Typography.bodyMediumBold,
      color: colors.CommonBackground,
      textAlign: 'center',
      marginTop: 12,
    },
  });

export default GettingStartedScreen;
