import React, { useState } from 'react';
import { StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useAppTheme } from '../hooks/useAppTheme';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  leftIcon?: string; // Icon name for left icon, optional
  rightText?: string; // Text for affix on the right, optional
  type?: 'flat' | 'outlined'; // Type of text input, optional
  textInputOtherProps?: Omit<
    TextInputProps,
    'selectionColor' | 'cursorColor'
  > & {
    selectionColor?: string;
    cursorColor?: string;
  };
  secureTextEntry?: boolean;
  placeholder?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  style,
  leftIcon,
  rightText,
  type = 'outlined',
  textInputOtherProps,
  secureTextEntry = false,
  placeholder,
}) => {
  const {colors} = useAppTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      left={leftIcon ? <PaperTextInput.Icon icon={leftIcon} /> : null}
      right={
        secureTextEntry ? (
          <PaperTextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisibility}
          />
        ) : rightText ? (
          <PaperTextInput.Affix text={rightText} />
        ) : null
      }
      mode={type}
      {...textInputOtherProps}
      secureTextEntry={!isPasswordVisible}
      activeOutlineColor={colors.CommonBackground}
      placeholder={placeholder}
      style={[styles.input, style]}
      outlineStyle={{
        borderRadius: 9,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    height: 64,
  },
});

export default CustomTextInput;
