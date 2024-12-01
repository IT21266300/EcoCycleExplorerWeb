import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../../assets/styles/Colors';
import ValidationLabel from '../ValidationLabel';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  TextInputCustomProps?: TextInputProps;
  CustomStyles?: any;
  isValidationEnabled?: boolean;
  validation?: boolean;
  validationMessage?: string;
  validationTextStyle?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder = '',
  value,
  onChangeText,
  keyboardType = 'default',
  TextInputCustomProps,
  CustomStyles,
  isValidationEnabled = false,
  validation = false,
  validationMessage = '',
  validationTextStyle,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            ...CustomStyles,
            borderColor: isFocused ? colors.SUB_COLOR : colors.LIGHT_GRAY,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...TextInputCustomProps}
      />
      {value == '' && (
        <View
          style={{
            position: 'absolute',
            height: 55,
            pointerEvents: 'none',
            justifyContent: 'center',
            left: 12,
          }}>
          <Text
            style={{
              color: '#888',
              fontSize: 16,
            }}>
            {placeholder}
          </Text>
        </View>
      )}
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
  container: {
    marginVertical: 12,
    flex: 1,
  },
  label: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -10 : -8,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 14,
    color: '#555',
    zIndex: 1,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 14,
    paddingBottom: Platform.OS === 'android' ? 12 : 10,
    color: colors.PRIMARY_BLACK,
    flex: 1,
    left: 0,
  },
});

export default CustomTextInput;
