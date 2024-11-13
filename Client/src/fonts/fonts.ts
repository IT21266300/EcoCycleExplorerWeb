export const Fonts = {
  OpenSansBold: 'OpenSans-Bold',
  OpenSansBoldItalic: 'OpenSans-BoldItalic',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansRegular: 'OpenSans-Regular',
} as const;

export type FontName = keyof typeof Fonts;
