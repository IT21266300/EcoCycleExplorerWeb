import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import Typography from '../styles/Typography';

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  props?: any;
}

// Primary Button Component
const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  style,
  onPress,
  props,
}) => {
  const {colors} = useAppTheme();
  const styles = makePrimaryStyles(colors);

  return (
    <Pressable
      style={[styles.button, styles.Primary, style]}
      onPress={onPress}
      {...props}>
      <Text style={[styles.buttonText, styles.PrimaryText]}>{title}</Text>
    </Pressable>
  );
};

const makePrimaryStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      height: 60,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      width: '100%',
    },
    Primary: {
      backgroundColor: colors.CommonBackground,
    },
    buttonText: {
      ...Typography.bodyDefaultBold,
    },
    PrimaryText: {
      color: colors.OnCommonBackgroundText,
    },
  });

// Secondary Button Component
const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  style,
  onPress,
  props,
}) => {
  const {colors} = useAppTheme();
  const styles = makeSecondaryStyles(colors);

  return (
    <Pressable
      style={[styles.button, styles.Secondary, style]}
      onPress={onPress}
      {...props}>
      <Text style={[styles.buttonText, styles.SecondaryText]}>{title}</Text>
    </Pressable>
  );
};

const makeSecondaryStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      height: 60,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    Secondary: {
      borderWidth: 1,
      borderColor: colors.OnCommonBackgroundText,
      backgroundColor: colors.OnCommonBackgroundText,
    },
    buttonText: {
      ...Typography.bodyDefaultBold,
    },
    SecondaryText: {
      color: colors.textBlack || 'black',
    },
  });

export { PrimaryButton, SecondaryButton };

