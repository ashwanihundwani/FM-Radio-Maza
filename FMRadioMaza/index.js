import { AppRegistry } from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';


AppRegistry.registerComponent('FMRadioMaza', () => App);

TrackPlayer.registerEventHandler(require('./app/utils/playerHandler'));
