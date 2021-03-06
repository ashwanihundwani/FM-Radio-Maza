import {
    ScrollView, Text, TextInput, View, Button, StyleSheet, Image,
    TouchableHighlight, AsyncStorage, Color, BackHandler, NativeEventEmitter, NativeModules
} from 'react-native';
import React, { Component } from 'react';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
import TimerMixin from 'react-timer-mixin';
import GridList from 'react-native-grid-list';
import TrackPlayer from 'react-native-track-player';
import { YellowBox } from 'react-native';

import MiniPlayer from '../containers/MiniPlayer'
import WebApi from '../libs/webApi'
import renderIf from '../utils/renderIf'
import NowPlayingModal from '../containers/NowPlayingModal'
import {connectedToNetwork, observeNetworkConnection, addToRecentlyPlayed} from '../utils/utils'


import { getImageForStationId } from '../utils/utils'

let widthToHeightRatio = 0.8

export default class Stations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stations: require('../resources/docs/radiostations.json'),
            mainViewWidth: 0,
            showModalPlayer:false,
            showAdBanner:true
        }

        this.onModalClose = this.onModalClose.bind(this)
        this.adFailedToLoad = this.adFailedToLoad.bind(this)
        this.showFullAd = this.showFullAd.bind(this)
    }
    componentDidMount() {

        console.log(TrackPlayer.STATE_NONE)
        console.log(TrackPlayer.STATE_STOPPED)
        console.log(TrackPlayer.STATE_PAUSED)
        console.log(TrackPlayer.STATE_PLAYING)
        console.log(TrackPlayer.STATE_BUFFERING)
        
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        //this.streamSelectedStation(this.state.stations[0])
        observeNetworkConnection((networkConnected)=> {
            
            if(networkConnected === true) {
                this.setState({
                    showAdBanner:true

                })
            }
            else {
                this.setState({
                    showAdBanner:false
                })
            }

        })
    }

    showFullAd() {
        AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => 
        AdMobInterstitial.showAd()
        ).catch((error)=>{

            console.log(JSON.stringify(error))

        });
    }

    componentWillMount() {

        this.setState({
            selectedStation: this.state.stations[0]
        })
    }

    adFailedToLoad(error) {
        this.setState({
            showAdBanner:false
        })

    }

    calculateItemWidth() {
        return (this.state.mainViewWidth / 2 - 30)
    }

    calculateItemHeight() {
        return ((this.state.mainViewWidth / 2 - 30) * widthToHeightRatio)
    }

    renderItem = ({ item, index }) => (
        <View>
            <TouchableHighlight
                onPress={() => {

                    let oldSelectedStation = this.state.selectedStation
                    this.setState({
                        selectedStation: item,
                        showModalPlayer: true
                    })
                    if(oldSelectedStation !== item){
                        this.streamSelectedStation(item)
                    }
                    addToRecentlyPlayed(item)

                    
                }}>
                <View style={{
                    shadowColor: "#808080",
                    elevation: 5,
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    },
                    borderRadius: 3,
                    backgroundColor: "white",
                    marginBottom: 10,
                    width: this.calculateItemWidth(),
                    height: this.calculateItemHeight()
                }}>
                    <Image
                        style={{ marginLeft: 5, marginTop: 5, resizeMode: "stretch", width: this.calculateItemWidth() - 10, height: this.calculateItemHeight() - 10 }}
                        source={getImageForStationId(item.id)}></Image>
                </View>
            </TouchableHighlight>
        </View>
    )

    streamSelectedStation(item) {
        console.log("STATION INFO: " + JSON.stringify(item))
        TrackPlayer.reset();
        TimerMixin.setTimeout(() => {
            TrackPlayer.setupPlayer({});

            TrackPlayer.add({
                id: item + "",
                url: item.streamingURL, //this.state.selectedStation.streamingURL, // just for test!
                title: item.name,
                artist: ""
            });
            TrackPlayer.play();
        }, 500)
    }

    onModalClose() {
        this.setState({
            showModalPlayer: false
        })
    }
    render() {
        return (
            <View onLayout={(event) => {
                this.setState({
                    mainViewWidth: event.nativeEvent.layout.width
                })
            }} style={{ flex: 1, backgroundColor: "white" }}>
                <GridList style={{

                    paddingLeft: 10,
                    marginLeft: 20,
                    marginBottom: 20
                }}
                    showSeparator
                    data={this.state.stations}
                    numColumns={2}
                    renderItem={this.renderItem}
                />
                {renderIf(this.state.showModalPlayer === false,
                    <MiniPlayer
                        station={this.state.selectedStation} />
                )}

                {renderIf(this.state.showModalPlayer === true,
                    <NowPlayingModal  showFullAd={this.showFullAd} onModalClose={this.onModalClose} station={this.state.selectedStation} />
                )}

                {renderIf(this.state.showAdBanner === true 
                && connectedToNetwork() === true,
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    onAdFailedToLoad={this.adFailedToLoad}
                    
                />)}


            </View>)

    }
}