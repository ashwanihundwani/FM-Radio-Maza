import TrackPlayer from 'react-native-track-player';

import TimerMixin from 'react-timer-mixin';

import {getFavouriteStations, getRecentlyVisitedStations} from '../utils/utils'

export const UPDATE_STATIONS = 'UPDATE_STATIONS'
export const PLAYBACK_STATE = 'PLAYBACK_STATE';
export const PLAYING_STATION = 'PLAYING_STATION';
export const PAUSE_PLAYER = 'PAUSE_PLAYER'
export const UPDATE_RECENT_STATIONS = 'RECENT_STATIONS'
export const UPDATE_FAVOURITE_STATIONS = 'FAVOURITE_STATIONS'


function dispatchStations(data) {
    return {
        type: UPDATE_STATIONS,
        stations: data
    };
    
}
function dispatchRecentStations(data) {
    return {
        type: UPDATE_RECENT_STATIONS,
        recentStations: data
    }; 
}

function dispatchFavouriteStations(data) {
    return {
        type: UPDATE_FAVOURITE_STATIONS,
        favouriteStations: data
    }; 
}

function dispatchStations(data) {
    return {
        type: UPDATE_STATIONS,
        stations: data
    };
    
}


function fetchAudioContent(dispatch) {
    console.log("Fetching Audio content from server");
    var stations = require('../resources/docs/radiostations.json')
    dispatch(dispatchStations(stations))
}
function recentStations(dispatch) {
    getRecentlyVisitedStations((stations)=> {
        if(stations !== null) {
            var stationObjects = JSON.parse(stations)
            dispatch(dispatchRecentStations(stationObjects))
        }
    })
}
function favouriteStations(dispatch) {
    getFavouriteStations((stations)=> {
        if(stations !== null) {
            var stationObjects = JSON.parse(stations)
            dispatch(dispatchFavouriteStations(stationObjects))
        }
    })
}

export function fetchStations() {

    console.log("Fetching Stations...");
    return async (dispatch) => {   
        fetchAudioContent(dispatch);
    };
}

export function fetchRecentStations() {
    
        console.log("Fetching Stations...");
        return async (dispatch) => {   
            recentStations(dispatch);
        };
}

export function fetchFavouriteStations() {
    
        console.log("Fetching Stations...");
        return async (dispatch) => {   
            favouriteStations(dispatch);
        };
}

export function playbackState(state) {
    console.log("Applying Playback State: " + state)
    return {
        type: PLAYBACK_STATE,
        state: state
    };
}

export function playStation(station) {
 
    console.log("Playing Station: " + JSON.stringify(station))
    TrackPlayer.reset();
    TimerMixin.setTimeout(() => {
        TrackPlayer.setupPlayer({});

        TrackPlayer.add({
            id: station + "",
            url: station.streamingURL, //this.state.selectedStation.streamingURL, // just for test!
            title: station.name,
            artist: ""
        });
        TrackPlayer.play();
    }, 500)

    return {
        type: PLAYING_STATION,
        playingStation: station
    };
}

export function pausePlayer(pause) {
    return async (dispatch) => {   
        if(pause === true) {
            TrackPlayer.pause();
        }
        else {
            TrackPlayer.play()
        }
    };
}

