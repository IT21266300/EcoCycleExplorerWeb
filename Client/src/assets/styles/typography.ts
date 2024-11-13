import { StyleSheet } from 'react-native';
import { Fonts } from '../../fonts/fonts';

const Typography = StyleSheet.create({
  h1Regular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 24,
    lineHeight: 28.8,
  },
  h1Bold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 24,
    lineHeight: 28.8,
  },
  h2Regular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 20,
    lineHeight: 24,
  },
  h2Bold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 22,
    lineHeight: 28.8,
  },
  inputTextRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  inputTextBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyDefaultRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyDefaultBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMediumRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    lineHeight: 16.8,
  },
  bodyMediumBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    lineHeight: 16.8,
  },
  bodySmallRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  bodySmallBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    lineHeight: 16,
  },
});

export default Typography;
