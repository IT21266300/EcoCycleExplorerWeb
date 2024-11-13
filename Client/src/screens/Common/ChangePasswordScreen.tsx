import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ScreenStyles,
  SpaceStyles,
  TextStyles,
} from '../../assets/styles/AppStyles';
import { colors } from '../../assets/styles/Colors';
import { ButtonWithoutIcon } from '../../components/Button.tsx';
import PasswordInputField from '../../components/TextInput/PasswordInputField.tsx';
import APIClient from '../../helpers/APIClient.tsx';
import { APIEndpoint } from '../../helpers/APIEndpoints.tsx';

const ChangePasswordScreen = ({ navigation }: any) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Password Validation
  //Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const changePasswordValidation = () => {
    if (oldPassword === '') {
      Alert.alert('Error', 'Please enter your old password');
      return;
    }
    if (newPassword === '') {
      Alert.alert('Error', 'Please enter new password');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Error',
        'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      );
      return;
    }
    if (confirmPassword === '') {
      Alert.alert('Error', 'Please confirm your password');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    //API Call
    changePasswordNetworkRequest();
  };

  function changePasswordNetworkRequest() {
    let requestModel = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    APIClient.sendRequest('POST', APIEndpoint.ChangePassword, requestModel)
      .then(response => response.json())
      .then(result => {
        if (result) {
          if (result.message === 'SUCCESS') {
            Alert.alert('Success', 'Password changed successfully');
            navigation.goBack();
          } else {
            Alert.alert('Error', result.message);
          }
        }
      })
      .catch(err => {
        console.log('🔴 API Error: ', err);
      });
  }

  return (
    <SafeAreaView style={ScreenStyles.container}>
      <ScrollView style={[ScreenStyles.subContainer]}>
        <View style={[SpaceStyles.m4]}>
          <Text style={TextStyles.H1}>Change Password</Text>
          <Text style={TextStyles.P}>
            Create new password or reset your password.
          </Text>
        </View>
        <View style={[SpaceStyles.m8, { marginTop: 20 }]}>
          <View style={SpaceStyles.m4}>
            <PasswordInputField
              placeholder="Old Password"
              value={oldPassword}
              onChangeText={setOldPassword}
              label="Old Password"
            />
          </View>
          <View style={[SpaceStyles.m4, { marginTop: 20 }]}>
            <PasswordInputField
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              label="New Password"
            />
            <PasswordInputField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              label="Confirm Password"
            />
          </View>
          <View style={SpaceStyles.m4}></View>
        </View>
        <View style={[{ marginTop: 26 }]}>
          <ButtonWithoutIcon
            onPress={changePasswordValidation}
            buttonText={'Change Password'}
            btnColor={colors.PRIMARY_COLOR}
            color={colors.PRIMARY_WHITE}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#52796D',
    padding: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
