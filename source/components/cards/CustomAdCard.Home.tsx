import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import Typography from '../../styles/Typography';
import { CustomThemeType } from '../../themes/theme';

interface CustomAdCardProps {
  title: string;
  subtitle: string;
  onPressLearnMore: () => void;
}

const CustomAdCard: React.FC<CustomAdCardProps> = ({
  title,
  subtitle,
  onPressLearnMore,
}) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.imageAndTextContainer}
        onPress={onPressLearnMore}>
        <Text style={styles.learnMore}>LEARN MORE</Text>
        <LottieView
          source={require('../../images/lotties/picTaking.json')}
          autoPlay
          loop
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomAdCard;

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.NativeCard.NativeCardBackground,
      borderRadius: 16,
      padding: 20,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      borderColor: colors.NativeCard.NativeCardBorder,
      borderWidth: 1,
      margin: 12,
    },
    subtitle: {
      ...Typography.bodyMediumRegular,
      color: colors.NativeCard.NativeCardSubText,
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.NativeCard.NativeCardMainText,
      marginBottom: 20,
      fontStyle: 'italic',
      fontFamily: 'serif',
      fontWeight: 'bold',
    },
    image: {
      width: 100,
      height: 100,
    },
    learnMore: {
      ...Typography.bodySmallBold,
      color: colors.NativeCard.NativeCardMainText,
    },
    imageAndTextContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
