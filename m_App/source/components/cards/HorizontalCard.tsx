import { Heart, Message, Send2 } from 'iconsax-react-native'; // Import Iconsax
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { TravelPartnerRequests } from '../../interface/ICard';
import { CustomThemeType } from '../../themes/theme';

const HorizontalCard: React.FC<TravelPartnerRequests> = ({
  userImage,
  name,
  title,
  routeDetails,
  onPress,
  timeAgo,
  likes,
  comments,
  shares,
}) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{uri: userImage}} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.routeDetails}>{routeDetails}</Text>
        </View>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.footer}>
        <View style={styles.iconRow}>
          <Heart
            size={24}
            color={colors.NativeCard.NativeCardMainText}
            variant="Broken"
            style={styles.icon}
          />
          <Text style={styles.iconText}>{likes}</Text>
        </View>
        <View style={styles.iconRow}>
          <Message
            size={24}
            color={colors.NativeCard.NativeCardMainText}
            style={styles.icon}
          />
          <Text style={styles.iconText}>{comments}</Text>
        </View>
        <View style={styles.iconRow}>
          <Send2
            size={24}
            color={colors.NativeCard.NativeCardMainText}
            style={styles.icon}
          />
          <Text style={styles.iconText}>{shares}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.NativeCard.NativeCardBackground,
      borderRadius: 12,
      borderColor: colors.NativeCard.NativeCardBorder,
      borderWidth: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    userInfo: {
      flex: 1,
      marginLeft: 10,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.NativeCard.NativeCardMainText,
    },
    routeDetails: {
      fontSize: 12,
      color: colors.NativeCard.NativeCardSubText,
    },
    timeAgo: {
      fontSize: 12,
      color: colors.NativeCard.NativeCardSubText,
    },
    title: {
      fontSize: 16,
      color: colors.NativeCard.NativeCardMainText,
      marginVertical: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
      gap: 32,
    },
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 5,
    },
    iconText: {
      fontSize: 12,
      color: colors.NativeCard.NativeCardSubText,
    },
  });
