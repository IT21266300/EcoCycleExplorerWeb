import { FC, useEffect, useState } from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { Eye, EyeSlash } from 'iconsax-react-native';
import Typography from '../styles/Typography';

interface Props extends TextInputProps {
  label: string;
  keyboardType: KeyboardTypeOptions;
  textInputStyles?: TextStyle | [TextStyle];
  otherTextInputProps?: TextInputProps;
  onChangeText: (text: string) => void;
  required?: boolean; // prop to indicate if the field is required
  optional?: boolean; // prop to indicate if the field is optional
  validationMessage?: string; // prop to set a validation message
}

const FloatingLabelInput: FC<Props> = props => {
  const [position, setPosition] = useState<Animated.Value>(
    new Animated.Value(0),
  );
  const [isActive, setActive] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(
    !props.secureTextEntry,
  );
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    if (props.value) {
      setActive(true);
      setPosition(new Animated.Value(1));
    }
  }, [props.value]);

  const _handleFocus = () => {
    if (props.keyboardType === 'decimal-pad' && props.value) {
      const newValue = props.value.replaceAll(',', '');
      if (newValue !== props.value) {
        props.onChangeText(newValue);
      }
    }

    if (!isActive) {
      setActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const _handleBlur = () => {
    if (props.keyboardType === 'phone-pad' && props.value) {
      const newValue = props.value.replace(/^0+/, '+94');
      if (newValue !== props.value) {
        props.onChangeText(newValue);
      }
    }

    if (props.keyboardType === 'decimal-pad' && props.value) {
      const newValue = Number(props.value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if (newValue !== props.value) {
        props.onChangeText(newValue);
      }
    }

    if (isActive && !props.value) {
      setActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const _animatedLabelStyles = () => {
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
      fontSize: isActive ? 12 : 18,
      color: isActive ? colors.textPlaceholderActive : colors.textPlaceholder,
      marginTop: isActive ? 6 : 0, // top-space changing point
    };
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  };

  const containerStyle: ViewStyle[] = [
    styles.container,
    isActive
      ? { borderColor: colors.strokeInputActive }
      : { borderColor: colors.strokeInputDefault },
    props.editable === false
      ? {
          backgroundColor: colors.backgroundDisabled,
          borderColor: colors.strokeInputDefault,
        }
      : {},
    props.validationMessage ? { borderColor: colors.strokeInputError } : {},
  ];

  const textInputStyle = StyleSheet.flatten([
    styles.textInput,
    props.textInputStyles,
    props.multiline ? styles.multiline : {},
  ]) as TextStyle;

  return (
    <View>
      <View style={containerStyle}>
        <Animated.Text style={[styles.titleStyles, _animatedLabelStyles()]}>
          {props.label}
          {!props.required && props.optional && (
            <Text style={styles.optional}> (optional)</Text>
          )}
        </Animated.Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={props.value}
            style={textInputStyle}
            underlineColorAndroid="transparent"
            onFocus={_handleFocus}
            onBlur={_handleBlur}
            onChangeText={handleChangeText}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry && !isPasswordVisible}
            multiline={props.multiline}
            editable={props.editable ?? true}
            {...props.otherTextInputProps}
          />
          {props.secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconWrapper}>
              {isPasswordVisible ? (
                <Eye color={colors.textDefault} size={24} />
              ) : (
                <EyeSlash color={colors.textDefault} size={24} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {props.validationMessage && (
        <Text style={styles.validationMessage}>{props.validationMessage}</Text>
      )}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 14,
      flexDirection: 'row',
      columnGap: 8,
      minHeight: 64,
      backgroundColor: colors.backgroundWhite,
      alignItems: 'center',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    textInput: {
      ...Typography.inputTextBold,
      flex: 1,
      paddingHorizontal: 0,
      color: colors.textDefault,
    },
    multiline: {
      height: 'auto',
      marginTop: 6,
    },
    titleStyles: {
      ...Typography.inputTextRegular,
      position: 'absolute',
      left: 16,
      color: colors.textDefault,
    },
    optional: {
      color: colors.textPlaceholder,
    },
    iconWrapper: {
      position: 'absolute',
      right: 0,
      top: Platform.OS === 'android' ? 4 : -4,
      justifyContent: 'center',
    },
    validationMessage: {
      color: colors.textError,
      marginTop: 4,
    },
  });

export default FloatingLabelInput;
