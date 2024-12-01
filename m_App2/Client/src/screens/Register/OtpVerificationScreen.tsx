import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import {
  ScreenStyles,
  SpaceStyles,
  TextStyles,
} from '../../assets/styles/AppStyles';
import { colors } from '../../assets/styles/Colors';
import { ButtonWithoutIcon } from '../../components/Button.tsx';
import APIClient from '../../helpers/APIClient.tsx';
import { APIEndpoint } from '../../helpers/APIEndpoints.tsx';

const OtpVerificationScreen = ({ route, navigation }: any) => {
  //Get Email From Parameters
  const otpRef = useRef<any>();
  const email = route?.params?.email;
  const [otp, setOtp] = useState('');

  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (rootName: string, data?: any) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: rootName,
          params: data,
        },
      ],
    });
  };

  const verifyOTPCode = () => {
    if (otp.length === 6) {
      let requestModel = {
        email: email,
        otp: otp,
      };
      APIClient.sendRequest('POST', APIEndpoint.OtpVerify, requestModel)
        .then(async response => {
          if (response.ok) {
            return response.json();
          } else {
            const error = await response.json();
            Alert.alert('OTP CODE ERROR', 'OTP Code Invalid or Expired ', [
              {
                text: 'OK',
              },
            ]);
          }
        })
        .then(response => {
          if (response) {
            if (response.message == 'SUCCESS') {
              Alert.alert('Success', 'Email Verified Successful', [
                {
                  text: 'OK',
                  onPress: () => {
                    navigateTo('SignUpSuccess');
                  },
                },
              ]);
            } else {
              Alert.alert('ERROR', response.message);
            }
          }
        })
        .catch((err: any) => {
          console.log('🔴 Error: ', err);
        });
    } else {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP code.');
    }
  };

  const resendOTP = () => {
    otpRef.current.clear();
    setResendDisabled(true);
    setTimer(60);
    const requestModel = {
      email: email,
    };
    APIClient.sendRequest('POST', APIEndpoint.ResendOtp, requestModel)
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          const error = await response.json();
          console.log(error.message);
        }
      })
      .then(response => {
        if (response) {
          if (response.message == 'SUCCESS') {
            Alert.alert('Success', 'OTP Sent Successfully');
          } else {
            console.log('🔴 Resend OTP Error: ', response.message);
          }
        }
      })
      .catch((err: any) => {
        console.log('🔴 Error: ', err);
      });
  };

  const HeaderView = () => {
    return (
      <View>
        <Text style={[TextStyles.H1, { textAlign: 'center' }]}>
          OTP Verification
        </Text>
        <Text style={[TextStyles.P, { textAlign: 'center' }]}>
          Enter your OTP verification code and continue.
        </Text>
      </View>
    );
  };

  const ResendCodeView = () => (
    <TouchableOpacity
      style={{ flexDirection: 'row' }}
      onPress={resendOTP}
      disabled={resendDisabled}>
      <Text style={[TextStyles.H6, { color: colors.PRIMARY_LIGHT_GRAY }]}>
        Did’t receive a code?
      </Text>
      <Text
        style={[
          TextStyles.H6,
          {
            color: resendDisabled
              ? colors.PRIMARY_LIGHT_GRAY
              : colors.PRIMARY_COLOR,
            textDecorationLine: 'underline',
          },
        ]}>
        {' '}
        Resend Code {resendDisabled ? `(${timer}s)` : ''}
      </Text>
    </TouchableOpacity>
  );

  const VerifyButtonView = () => {
    return (
      <View style={ScreenStyles.subContainer}>
        <ButtonWithoutIcon
          buttonText={'Verify'}
          btnColor={colors.PRIMARY_COLOR}
          color={'#FFF'}
          onPress={verifyOTPCode}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={ScreenStyles.container}>
      <ScrollView style={ScreenStyles.subContainer}>
        <View style={SpaceStyles.m16}>
          <HeaderView />
          <View style={styles.VerifyCodeInputContainer}>
            <OtpInput
              ref={otpRef}
              theme={{ pinCodeContainerStyle: styles.pinCodeContainer }}
              numberOfDigits={6}
              onFilled={text => setOtp(text)}
            />
          </View>
          <ResendCodeView />
        </View>
      </ScrollView>
      <VerifyButtonView />
    </SafeAreaView>
  );
};
export default OtpVerificationScreen;
const styles = StyleSheet.create({
  pinCodeContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexGrow: 1,
    marginHorizontal: 4,
  },
  VerifyCodeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
