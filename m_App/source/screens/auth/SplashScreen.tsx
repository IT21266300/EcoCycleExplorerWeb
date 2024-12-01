import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDimensions, logo } from '../../helpers/AppSettings';
import { useAppTheme } from '../../hooks/useAppTheme';
import { setUser } from '../../redux/UserReducer';
import { ScreenStyles } from '../../styles/AppStyles';
import { CustomThemeType } from '../../themes/theme';
import GoogleSigninUtils from '../../utils/GoogleSignin';

const SplashScreen = ({navigation}: any) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  // Check user login status on app start
  useEffect(() => {
    const checkUser = async () => {
      const unsubscribe = auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            const userData = await GoogleSigninUtils.getCurrentUser();
            if (userData) {
              dispatch(setUser(userData as any));
            }
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'GettingStart'}],
          });
        }
      });

      // Cleanup subscription on unmount
      return unsubscribe;
    };

    checkUser();
  }, [navigation, dispatch]);

  return (
    <>
      <StatusBar backgroundColor={colors.BG_COLOR} />
      <View style={[ScreenStyles.container, styles.container]}>
        <Image style={[styles.logo]} source={logo()} />
      </View>
    </>
  );
};

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BG_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    logo: {
      width: AppDimensions.width * 0.5,
      height: 300,
      resizeMode: 'contain',
    },
  });

export default SplashScreen;
