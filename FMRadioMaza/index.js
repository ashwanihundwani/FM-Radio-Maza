import { AppRegistry } from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import store from './app/store'
import createPlayerHandler from './app/utils/playerHandler'


AppRegistry.registerComponent('FMRadioMaza', () => App);

TrackPlayer.registerEventHandler(createPlayerHandler(store));