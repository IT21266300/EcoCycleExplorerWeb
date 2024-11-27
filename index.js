import { AppRegistry, Text } from 'react-native';
import { name as appName } from './app.json';
import App from './source/App';

AppRegistry.registerComponent(appName, () => App);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
