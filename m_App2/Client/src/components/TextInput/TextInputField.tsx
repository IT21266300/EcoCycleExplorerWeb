import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  props?: TextInputProps;
  onChangeText: (text: string) => void;
}

const TextInputField: FC<TextInputFieldProps> = ({
  placeholder,
  value,
  props,
  onChangeText,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInputStyle}
      placeholderTextColor="#9C9BC2"
      onChangeText={onChangeText}
      value={value}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
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
});

export default TextInputField;
