import { format } from 'date-fns';
import { Calendar } from 'iconsax-react-native';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

export const TextInputFieldForProfile = ({
  placeholder,
  onChangeText,
  value = '',
  disabled = true,
  props,
}: any) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={TextFieldStyles.TextInputStyle}
      placeholderTextColor={'#9C9BC2'}
      onChangeText={onChangeText}
      value={value}
      editable={disabled}
      {...props}
    />
  );
};

// Added Image Icon but not working properly
export const TextInputWithIconField = ({ placeholder }: any) => {
  return (
    <TextInput
      inlineImageLeft="search_icon.png"
      placeholder={placeholder}
      style={TextFieldStyles.TextInputStyle}
      placeholderTextColor={'#9C9BC2'}
    />
  );
};
export const NumberInputField = ({
  placeholder,
  onChangeText,
  value = '',
}: any) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      keyboardType={'number-pad'}
      style={TextFieldStyles.numberInputField}
      onChangeText={onChangeText}
      placeholderTextColor={'#9C9BC2'}
    />
  );
};

let TextFieldStyles = StyleSheet.create({
  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  numberInputField: {
    padding: 16,
    backgroundColor: '#FFFF',
    borderRadius: 8,
    height: 53,
    color: '#000',
    flexGrow: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passwordInputField: {
    padding: 16,
    backgroundColor: '#F3F6FB',
    borderRadius: 8,
    height: 53,
    color: '#000',
  },
  TextInputStyle: {
    padding: 16,
    backgroundColor: '#F3F6FB',
    borderRadius: 8,
    color: '#000',
    flexGrow: 1,
  },
  dateTextSHow: {
    padding: 16,
    borderRadius: 8,
    color: '#000',
  },
});
