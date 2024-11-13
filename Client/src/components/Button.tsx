import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';


interface ButtonProps {
  btnColor: string;
  color: string;
  icon?: any;
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const ButtonWithBorderWithoutIcon: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity style={[styles.buttonWithBorder, { backgroundColor: props.btnColor }]} onPress={props.onPress}>
      <Text style={[styles.text, { color: props.color }]}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export const ButtonWithoutIcon: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: props.btnColor }]} onPress={props.onPress}>
      <Text style={[styles.text, { color: props.color }]}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    height: 53,
  },
  buttonWithBorder: {
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    height: 53,
    borderColor: '#EBEBF5',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: 'normal',
  },
});
