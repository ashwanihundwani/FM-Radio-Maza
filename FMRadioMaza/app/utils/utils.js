import React from 'react';
import {Platform, NetInfo, Alert, AsyncStorage} from 'react-native'

let networkObserveCallback = ''

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
            return require('../resources/images/fm_gold.jpeg')
        }
        case 5: {
            return require('../resources/images/radio_city_hindi.png')
        }
        case 6: {
            return require('../resources/images/city_1016.jpeg')
        }
        case 7: {
            return require('../resources/images/radio_city_tamil.jpg')
        }
        case 8: {
            return require('../resources/images/fun_ka_antenna.jpg')
        }
        case 9: {
            return require('../resources/images/sada_bahar_radio.jpeg')
        }
        case 10: {
            return require('../resources/images/shakti_fm.jpg')
        }
        case 11: {
            return require('../resources/images/radio_beyond.jpeg')
        }
        case 12: {
            return require('../resources/images/bbc_hindi_radio.jpg')
        }
        case 13: {
            return require('../resources/images/bbc_tamil.jpg')
        }
        case 14: {
            return require('../resources/images/AR_Rehman.png')
        }
        case 15: {
            return require('../resources/images/chennai_rainbow.jpeg')
        }
        case 16: {
            return require('../resources/images/sikhnet.png')
        }
        case 17: {
            return require('../resources/images/sai.jpeg')
        }
        case 18: {
            return require('../resources/images/harminder_sahib.jpeg')
        }
        case 19: {
            return require('../resources/images/madhuban.jpg')
        }
        case 20: {
            return require('../resources/images/radio_91.1.jpeg')
        }
        case 21: {
            return require('../resources/images/kerala_radio.jpg')
        }
        case 22: {
            return require('../resources/images/easy_96_radio.jpeg')
        }
        case 23: {
            return require('../resources/images/radio_sharda.jpeg')
        }
        case 24: {
            return require('../resources/images/dhol_radio.jpg')
        }
        
        case 25: {
            return require('../resources/images/vivid_bharti_radio.png')
        }
        case 26: {
            return require('../resources/images/vanavil_fm_radio.png')
        }
        case 27: {
            return require('../resources/images/radio_city_freedom.png')
        }
        case 28: {
            return require('../resources/images/sunrise_radio.jpeg')
        }
        case 29: {
            return require('../resources/images/radio_india.jpeg')
        }
        case 30: {
            return require('../resources/images/bombay_beats.jpeg')
        }
        case 31: {
            return require('../resources/images/classic_punjabi.jpeg')
        }
        case 32: {
            return require('../resources/images/shyam_radio.jpeg')
        }
        case 33: {
            return require('../resources/images/radio_afsana.png')
        }
        case 34: {
            return require('../resources/images/calm_radio.png')
        }
        case 35: {
            return require('../resources/images/radio_islam_malyalam.jpeg')
        }
        case 36: {
            return require('../resources/images/radio_schizoid_chillout.jpeg')
        }
        case 37: {
            return require('../resources/images/hits_of_bollywood.jpeg')
        }
        case 38: {
            return require('../resources/images/telugu_one_india.png')
        }
        case 39: {
            return require('../resources/images/mohd_rafi.jpeg')
        }
        case 40: {
            return require('../resources/images/jesus_fm.jpeg')
        }
    }

}

export function connectedToNetwork() {
    return isNetworkConnected
}

export function observeNetworkConnection(callback) {
    networkObserveCallback = callback
}


function observeNetworkConnectivity() {
    
        console.log("Network observer initialized...") 
        NetInfo.isConnected.fetch().then(isConnected => {        
            isNetworkConnected = isConnected      
            networkObserveCallback(isNetworkConnected)
            console.log("Network Connected: " + isNetworkConnected) 
        });
            
        NetInfo.isConnected.addEventListener('connectionChange', (connectionInfo) => {
    
            console.log("Network connection changed") 
            NetInfo.isConnected.fetch().then(isConnected => {        
                isNetworkConnected = isConnected    
                networkObserveCallback(isNetworkConnected)
                console.log("Network Connected: " + isNetworkConnected)     
            });
        })
    }
    
    observeNetworkConnectivity()