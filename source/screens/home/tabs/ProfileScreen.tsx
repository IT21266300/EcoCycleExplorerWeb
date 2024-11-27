import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { useAppTheme } from '../../../hooks/useAppTheme';
import Typography from '../../../styles/Typography';

const ProfileScreen = () => {
  const { colors } = useAppTheme();
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BG_COLOR }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: user.profilePicture || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
        </View>

        {/* Name and Email */}
        <Text style={[Typography.h1Bold, styles.textCentered]}>
          {user.displayName || 'Guest User'}
        </Text>
        <Text style={[Typography.bodyMediumRegular, styles.textCentered, { color: colors.SecondaryText }]}>
          {user.email || 'guest@example.com'}
        </Text>

        {/* Bio Section */}
        <Text style={[Typography.h2Bold, styles.sectionHeader]}>About Me</Text>
        <Text style={[Typography.bodyDefaultRegular, { color: colors.PrimaryText }]}>
          {user.bio || "This user hasn't added a bio yet."}
        </Text>

        {/* Other Details */}
        <View style={styles.detailsSection}>
          <Text style={[Typography.h2Bold, styles.sectionHeader]}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={[Typography.bodyMediumBold, { color: colors.PrimaryText }]}>Location:</Text>
            <Text style={[Typography.bodyMediumRegular, { color: colors.SecondaryText }]}>
              {user.location || 'Not specified'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[Typography.bodyMediumBold, { color: colors.PrimaryText }]}>Joined:</Text>
            <Text style={[Typography.bodyMediumRegular, { color: colors.SecondaryText }]}>
              {new Date(user.joinedAt).toLocaleDateString() || 'Unknown'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  textCentered: {
    textAlign: 'center',
    marginVertical: 4,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  detailsSection: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});