import { Eye, EyeSlash } from 'iconsax-react-native';
import { FC, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../assets/styles/Colors';
import ValidationLabel from '../ValidationLabel'; // Import ValidationLabel

interface PasswordInputFieldProps {
  placeholder: string;
  value: string;
  props?: TextInputProps;
  onChangeText: (text: string) => void;
  label: string;
  onKeyUp?: () => void;
  isValidationEnabled?: boolean;
  validation?: boolean;
  validationMessage?: string;
  validationTextStyle?: any;
}

const PasswordInputField: FC<PasswordInputFieldProps> = ({
  placeholder,
  value,
  props,
  onChangeText,
  label,
  onKeyUp,
  isValidationEnabled = false, // Default is false
  validation = false, // Default is false (no validation error)
  validationMessage = '', // Default message is empty
  validationTextStyle, // Custom styles for validation label
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <View
      style={[
        {
          marginVertical: 8,
        },
      ]}>
      <View style={styles.textInputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          onKeyPress={onKeyUp}
          style={[styles.textInputStyle, { paddingRight: 38 }]}
          placeholder={placeholder}
          placeholderTextColor="#9C9BC2"
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isPasswordSecure}
          textContentType="oneTimeCode"
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}>
          {isPasswordSecure ? (
            <EyeSlash size={20} color={colors.LIGHT_GRAY} />
          ) : (
            <Eye size={20} color={colors.LIGHT_GRAY} />
          )}
        </TouchableOpacity>
      </View>
      {/* Validation Label */}
      <ValidationLabel
        isValidationEnabled={isValidationEnabled}
        validation={validation}
        message={validationMessage}
        textStyle={validationTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 0,
    height: 55,
  },
  textInputStyle: {
    padding: 16,
    borderRadius: 8,
    color: '#000',
    flexGrow: 1,
  },
  iconButton: {
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  label: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -10 : -8,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 14,
    color: '#555',
    zIndex: 1, // Ensure label is above the TextInput
  },
});

export default PasswordInputField;
