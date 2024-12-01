import { Dimensions, useColorScheme } from 'react-native';

export default {
  isDebug: true,
};

export const AppDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const logo = () => {
  const scheme = useColorScheme();
  return scheme === 'dark'
    ? require('../images/logo-e.png')
    : require('../images/logo-e.png');
};
