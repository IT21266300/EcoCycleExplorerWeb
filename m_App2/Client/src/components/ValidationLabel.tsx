import { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../assets/styles/Colors';
interface Props {
  isValidationEnabled: boolean;
  validation: boolean;
  message: string;
  textStyle?: TextStyle | undefined;
}

const ValidationLabel: FC<Props> = ({
  isValidationEnabled,
  validation,
  message,
  textStyle = null,
}) => {
  return isValidationEnabled && validation ? (
    <Text style={[styles.textStyle, textStyle]}>{message}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  textStyle: {
    margin: 2,
    color: colors.PRIMARY_RED,
    fontSize: 12,
  },
});

export default ValidationLabel;
