import React from 'react';
import {Platform, NetInfo, Alert, AsyncStorage} from 'react-native'

export function isPlatFormAndroid() {
    return Platform.OS === "android"
}

export function getImageForStationId(stationId) {

    switch (stationId) {
        case 1: {
            return require('../resources/images/redfm.jpeg')
        }
        case 2: {
            return require('../resources/images/mirchi_98.3.jpg')
        }
        case 3: {
            return require('../resources/images/evergreen_hits.png')
        }
        case 4: {
            return require('../resources/images/radio_beyond.jpeg')
        }
        case 5: {
            return require('../resources/images/radio_city_hindi.png')
        }
    }

}