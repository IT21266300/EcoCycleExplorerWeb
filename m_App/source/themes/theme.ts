import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  MD3Theme,
} from 'react-native-paper';

export type CustomThemeType = MD3Theme & {
  myOwnProperty: boolean;
  colors: MD3Theme['colors'] & {
    BG_COLOR: string;

    PrimaryBackground: string;
    SecondaryBackground: string;
    CommonBackground: string;
    OnCommonBackgroundText: string;
    OnCommonBackgroundSubText: string;

    PrimaryText: string;
    SecondaryText: string;
    SubText: string;
    highlightText: string;

    PrimaryButton: string;
    PrimaryButtonText: string;
    SecondaryButton: string;
    SecondaryButtonText: string;
    Accent: string;
    Success: string;
    Warning: string;
    Error: string;
    Highlight: string;
    Link: string;

    BorderColor: string;

    BottomTabBar: {
      activeTintColor: string;
      inactiveTintColor: string;
      activeBackgroundColor: string;
      inactiveBackgroundColor: string;
    };

    NativeCard: {
      NativeCardBackground: string;
      NativeCardMainText: string;
      NativeCardSubText: string;
      NativeCardIcon: string;
      NativeCardIconBackground: string;
      NativeCardBorder: string;
    };

    ChipBackground: string;

    LIGHT_YELLOW: string;
  };
};

export const LightThemeColors: CustomThemeType = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    BG_COLOR: '#FFFFFF',
    PrimaryBackground: '#D6BD98',
    SecondaryBackground: '#007A8C',
    CommonBackground: '#D6BD98',
    OnCommonBackgroundText: '#ffffff',
    OnCommonBackgroundSubText: '#ffffffbf',

    PrimaryText: '#333333',
    SecondaryText: '#555555',
    SubText: '#777777',
    highlightText: '#007A8C',

    PrimaryButton: '#D6BD98',
    PrimaryButtonText: '#FFFFFF',
    SecondaryButton: '#E5F4F6',
    SecondaryButtonText: '#007A8C',
    Accent: '#FF8C42',
    Success: '#3BA776',
    Warning: '#FFB400',
    Error: '#FF4E42',
    Highlight: '#FFEC42',
    Link: '#0066CC',

    BorderColor: '#E5E5E5',

    //Bottom Tab Bar
    BottomTabBar: {
      activeTintColor: '#007A8C',
      inactiveTintColor: '#777777',
      activeBackgroundColor: '#E5F4F6',
      inactiveBackgroundColor: '#FFFFFF',
    },

    NativeCard: {
      NativeCardBackground: '#ffffff',
      NativeCardMainText: '#333333',
      NativeCardSubText: '#777777',
      NativeCardIcon: '#007A8C',
      NativeCardIconBackground: '#E5F4F6',
      NativeCardBorder: '#E5E5E5',
    },

    ChipBackground: '#edf1f170',

    LIGHT_YELLOW: '#F6F7BA',
  },
};

export const DarkThemeColors: CustomThemeType = {
  ...MD3DarkTheme,
  myOwnProperty: true,
  colors: {
    ...MD3DarkTheme.colors,
    BG_COLOR: '#000000',
    PrimaryBackground: '#000000',
    SecondaryBackground: '#1E3A3D',
    CommonBackground: '#D6BD98',
    OnCommonBackgroundText: '#ffffff',
    OnCommonBackgroundSubText: '#ffffffbf',

    PrimaryText: '#E1E1E1',
    SecondaryText: '#A1A1A1',
    SubText: '#777777',
    highlightText: '#007A8C',

    PrimaryButton: '#007A8C',
    PrimaryButtonText: '#FFFFFF',
    SecondaryButton: '#1E3A3D',
    SecondaryButtonText: '#E1F5F7',
    Accent: '#FF8C42',
    Success: '#3BA776',
    Warning: '#FFB400',
    Error: '#FF4E42',
    Highlight: '#FFEC42',
    Link: '#66BFFF',

    BorderColor: '#3e3f3f',

    //Bottom Tab Bar
    BottomTabBar: {
      activeTintColor: '#E1F5F7',
      inactiveTintColor: '#A1A1A1',
      activeBackgroundColor: '#1E3A3D',
      inactiveBackgroundColor: '#000000',
    },

    NativeCard: {
      NativeCardBackground: '#0e0d0dbd',
      NativeCardMainText: '#E1F5F7',
      NativeCardSubText: '#A1A1A1',
      NativeCardIcon: '#007A8C',
      NativeCardIconBackground: '#1E3A3D',
      NativeCardBorder: '#3e3f3f59',
    },

    ChipBackground: '#1c2c293f',

    LIGHT_YELLOW: '#F6F7BA',
  },
};
