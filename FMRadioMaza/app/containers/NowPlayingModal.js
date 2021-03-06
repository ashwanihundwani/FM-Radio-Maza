import React, { Component } from 'react';
import {
    Slider, View, ScrollView, Text, StatusBar,
    Button, StyleSheet, FlatList,
    TouchableHighlight, Dimensions, ActivityIndicator,
    TouchableOpacity, Image, Alert, Modal
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import TimerMixin from 'react-timer-mixin';

import iconPlay from '../resources/images/play_black.png';
import iconPause from '../resources/images/pause_black.png';
import iconPrevious from '../resources/images/prev_black.png';
import iconNext from '../resources/images/next_black.png';
import ImageButton from './ImageButton';
import { getImageForStationId } from "../utils/utils";
import ModalWrapper from 'react-native-modal-wrapper';
import SystemSetting from 'react-native-system-setting'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
import { connect } from 'react-redux';
import {pausePlayer, playStation} from '../actions/action'
import {addToFavourites} from '../utils/utils'
import {fetchFavouriteStations} from '../actions/action'


const windowHeight = Dimensions.get('window').height;
export default class NowPlayingModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            currentVolume: 0,
            volumeListener: undefined,
            showAdBanner:true
        }

        //get the current volume
        SystemSetting.getVolume().then((volume) => {
            this.setState({
                currentVolume: volume
            })
        });


        // listen the volume changing if you need
        this.state.volumeListener = SystemSetting.addVolumeListener((data) => {
            const volume = data.value;
            this.setState({
                currentVolume: volume
            })
        });
    }


    _playPause() {
        // change the volume
        if(this.props.state === TrackPlayer.STATE_PAUSED) {
            this.props.pausePlayer(false)
        }
        else {
            this.props.pausePlayer(true)
            this.props.showFullAd()
        }
    }

    _previous() {
        var playingStationIndex = this.props.stations.indexOf(this.props.playingStation)
        console.log("Playing index: " + playingStationIndex)
        console.log("Stations count: " + this.props.stations.length + ", Next Station index: " + (playingStationIndex + 1))
        if(playingStationIndex > 0) {
            var previousStation = this.props.stations[playingStationIndex - 1]
            console.log("Previous index: " + JSON.stringify(previousStation))
            this.props.playStation(previousStation)
        }
        this.props.showFullAd()

    }

    _next() {
        var playingStationIndex = this.props.stations.indexOf(this.props.playingStation)
        console.log("Playing index: " + playingStationIndex)        
        if(this.props.stations.length > playingStationIndex + 1) {
            var nextStation = this.props.stations[playingStationIndex + 1]
            console.log("Next index: " + JSON.stringify(nextStation))
            this.props.playStation(nextStation)
        }
        this.props.showFullAd()
    }

    render() {
        return (
            <View>
                {/* <ModalWrapper
                    containerStyle={{ flexDirection: 'row', alignItems: 'flex-end' }}
                    style={{ flex: 1, height: '50%', borderTopLeftRadius: 17, borderTopRightRadius: 17, }}
                    transparent={true}
                    visible={true}
                    animationType={'none'}
                    shouldCloseOnOverlayPress={true}
                    shouldAnimateOnRequestClose={true}
                    shouldAnimateOnOverlayPress={true}
                    onRequestClose={() => this.props.onModalClose()}> */}

                    <View style={styles.dialogContainer}>
                    <TouchableHighlight onPress={()=>
                    this.props.onModalClose()
                    } style={{height:150, backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
                        <View />
                    </TouchableHighlight>
                        <View style={styles.dialog}>
                            <Image style={styles.modalImage}
                                /*source={getImageForStationId(this.props.station.id)}*/>
                            </Image>
                            <Text style={styles.songTitle}>
                                {this.props.playingStation.name}</Text>
                            <View style={{flexDirection:"row"}}>
                            <Slider
                                style={{ width: 200 }}
                                step={0.1}
                                maximumValue={1.0}
                                minimumValue={0.0}
                                onValueChange={(value) => SystemSetting.setVolume(value)}
                                value={this.state.currentVolume}
                            />
                            <ImageButton
                                    source={iconPrevious}
                                    onPress={()=> {
                                        addToFavourites(this.props.playingStation)
                                        TimerMixin.setTimeout(()=> {
                                            this.props.fetchFavouriteStations()
                                        }, 200)
                                    }}
                                    imageStyle={styles.controlIcon}
                                />
                            </View>

                            <View style={styles.controls}>
                                <ImageButton
                                    source={iconPrevious}
                                    onPress={this._previous.bind(this)}
                                    imageStyle={styles.controlIcon}
                                />
                                <ImageButton
                                    source={this.props.state == TrackPlayer.STATE_PAUSED ? iconPlay : iconPause}
                                    onPress={this._playPause.bind(this)}
                                    style={styles.playPause}
                                    imageStyle={styles.controlIcon}
                                />
                                <ImageButton
                                    source={iconNext}
                                    onPress={this._next.bind(this)}
                                    imageStyle={styles.controlIcon}
                                />
                            </View>
                        </View>
                    </View>
                {/* </ModalWrapper> */}
            </View>
        );
    }

    componentWillUnmount() {
        SystemSetting.removeListener(this.state.volumeListener)
        console.log("Volume listener removed")
    }
}

const styles = StyleSheet.create({
    modalImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 20,
        borderColor: "gray",
        borderWidth: 2,
    },

    dialogContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    dialog: {
        height: windowHeight / 2,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    songTitle: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },


    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 25
    },
    controlIcon: {
        width: 40,
        height: 40
    },
    playPause: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ffffff',
        padding: 10,
        marginHorizontal: 15
    }
});


function mapStateToProps(state) {
    
        return {
            stations: state.playback.stations,
            state: state.playback.state,
            playingStation: state.playback.playingStation
        };
}

module.exports = connect(mapStateToProps, {pausePlayer, playStation, fetchFavouriteStations})(NowPlayingModal);
    