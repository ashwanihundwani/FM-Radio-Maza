import { combineReducers } from 'redux';
import {
    UPDATE_STATIONS,
    PLAYBACK_STATE,
    PLAYING_STATION,
    PAUSE_PLAYER,
    UPDATE_FAVOURITE_STATIONS,
    UPDATE_RECENT_STATIONS
} from '../actions/action';


function playbackReducer(state = {}, action) {


    switch (action.type) {
        case PLAYBACK_STATE:
            return {
                ...state,
                state: action.state
            };
        case PLAYING_STATION:
        console.log("Current station = "+JSON.stringify(action.playingStation) );
            return {
                ...state,
                playingStation: action.playingStation
            };
        case UPDATE_STATIONS:
            return {
                ...state,
                stations: action.stations
            };
        case UPDATE_RECENT_STATIONS:
        return {
            ...state,
            recentStations: action.recentStations
        };
        case UPDATE_FAVOURITE_STATIONS:
        return {
            ...state,
            favouriteStations: action.favouriteStations
        };
        case PAUSE_PLAYER:
            return {
                ...state
            };
        default:
            return state;
    }
}

module.exports = combineReducers({
    playback: playbackReducer
});
