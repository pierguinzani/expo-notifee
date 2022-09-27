import { registerRootComponent } from 'expo';
import { Text, AppRegistry } from 'react-native';
import CustomComponent from './CustomComponent';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

AppRegistry.registerComponent('custom', () => CustomComponent);

AppRegistry.registerComponent('main', () => App);
