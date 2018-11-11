import { playbackState, playbackTrack } from '../actions/action';
import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

async function playbackHandler(store, data) {
    console.log("Event Type = "+data.type)
    console.log("State Type = "+JSON.stringify(data.state))

    switch(data.type) {

        // Forward remote events to the player
        case 'remote-play':
            TrackPlayer.play();
            break;
        case 'remote-pause':
            TrackPlayer.pause();
            break;
        case 'remote-stop':
            TrackPlayer.stop();
            break;
        case 'remote-next':
            TrackPlayer.skipToNext();
            break;
        case 'remote-previous':
            TrackPlayer.skipToPrevious();
            break;
        case 'remote-seek':
            TrackPlayer.seekTo(data.position);
            break;

        // You can make ducking smoother by adding a fade in/out
        case 'remote-duck':
            TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
            break;

        // Playback updates
        case 'playback-state':
            store.dispatch(playbackState(data.state));
            break;
        case 'playback-error':
            //Alert.alert('An error ocurred', data.error);
            break;
    }
};

module.exports = function(store) {
    return playbackHandler.bind(null, store);
};