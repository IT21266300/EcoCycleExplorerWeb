import { useTheme } from 'react-native-paper';
import { CustomThemeType } from '../themes/theme';

export const useAppTheme = () => useTheme<CustomThemeType>();
