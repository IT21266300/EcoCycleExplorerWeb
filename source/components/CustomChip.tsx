import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomThemeType } from '../themes/theme';

interface CustomChipProps {
  text: string;
  icon?: string;
  onPress?: () => void;
  onClose?: () => void;
  selected?: boolean;
  style?: object;
}

const CustomChip: React.FC<CustomChipProps> = ({
  text,
  icon,
  onPress,
  onClose,
  selected = false,
  style,
}) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <Chip
        icon={icon}
        onPress={onPress}
        selected={selected}
        onClose={onClose}
        style={[styles.chip, selected && styles.selectedChip]}
        textStyle={styles.text}>
        {text}
      </Chip>
    </View>
  );
};

export default CustomChip;

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
    },
    chip: {
      backgroundColor: colors.ChipBackground,
      borderColor: colors.BorderColor,
      borderWidth: 1,
    },
    selectedChip: {
      borderColor: colors.highlightText,
    },
    text: {
      color: colors.PrimaryText,
    },
  });
