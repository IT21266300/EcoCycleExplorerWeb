import { StyleSheet } from 'react-native';
import { Fonts } from './Fonts';

const Typography = StyleSheet.create({
  h1Regular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: 'regular',
  },
  h1Bold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: 'bold',
  },
  h2Regular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'regular',
  },
  h2Bold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 22,
    lineHeight: 28.8,
    fontWeight: 'bold',
  },
  inputTextRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'regular',
  },
  inputTextBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  bodyDefaultRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'regular',
  },
  bodyDefaultBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  bodyMediumRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    lineHeight: 16.8,
    fontWeight: 'regular',
  },
  bodyMediumBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    lineHeight: 16.8,
    fontWeight: 'bold',
  },
  bodySmallRegular: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'regular',
  },
  bodySmallBold: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});

export default Typography;
