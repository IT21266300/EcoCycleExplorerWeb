import { StyleSheet } from 'react-native';
import { Fonts } from '../../fonts/fonts';
import { colors } from './Colors';

export const ScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  subContainer: {
    padding: 16,
  },
});

export const SpaceStyles = StyleSheet.create({
  m4: {
    gap: 4,
  },
  m8: {
    gap: 8,
  },
  m16: {
    gap: 16,
  },
});

export const TextStyles = StyleSheet.create({
  H1: {
    fontSize: 28, // Larger for primary headings
    fontWeight: 'bold',
    color: colors.PRIMARY_BLACK,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: 40, // Increased line height for readability
  },
  H2: {
    fontSize: 24, // Suitable for secondary headings
    lineHeight: 32,
    color: colors.PRIMARY_BLACK,
    fontWeight: '700',
    letterSpacing: -0.5, // Slight letter spacing for clarity
  },
  H3: {
    fontSize: 20, // Used for subheadings
    lineHeight: 28,
    color: colors.PRIMARY_BLACK,
    fontWeight: '500',
    letterSpacing: -0.4,
    fontFamily: Fonts.OpenSansBold, // Slightly heavier for emphasis
  },
  H4: {
    fontSize: 18, // A step below H3
    fontWeight: 'normal',
    color: colors.PRIMARY_BLACK,
    lineHeight: 24,
    fontFamily: Fonts.OpenSansRegular,
  },
  H5: {
    fontSize: 16, // Suitable for section titles
    fontWeight: 'normal',
    color: colors.PRIMARY_BLACK,
    lineHeight: 22,
    fontFamily: Fonts.OpenSansRegular,
  },
  H6: {
    fontSize: 14, // For labels or captions
    fontWeight: 'normal',
    color: colors.PRIMARY_BLACK,
    lineHeight: 20,
    fontFamily: Fonts.OpenSansRegular,
  },
  H7: {
    fontSize: 12, // For small labels or secondary captions
    fontWeight: '600',
    color: colors.PRIMARY_BLACK,
    lineHeight: 18,
    fontFamily: Fonts.OpenSansRegular,
  },
  P: {
    fontSize: 16, // Standard paragraph text
    fontWeight: 'normal',
    color: colors.PRIMARY_BLACK,
    lineHeight: 24, // Comfortable line height for reading
    fontFamily: Fonts.OpenSansRegular,
  },
  Small: {
    fontSize: 12, // Small print or disclaimers
    fontWeight: 'normal',
    color: '#666', // Lighter color for less emphasis
    lineHeight: 18,
    fontFamily: Fonts.OpenSansRegular,
  },
});
