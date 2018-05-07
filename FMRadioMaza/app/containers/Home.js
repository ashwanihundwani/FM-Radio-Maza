import {
    ScrollView, Text, TextInput, View, Button, StyleSheet, Image,
    TouchableHighlight, AsyncStorage, Color, BackHandler, NativeEventEmitter, NativeModules
} from 'react-native';
import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import GridList from 'react-native-grid-list';
import TrackPlayer from 'react-native-track-player';
import MiniPlayer from '../containers/MiniPlayer'
import { YellowBox } from 'react-native';
import WebApi from '../libs/webApi'
import renderIf from '../utils/renderIf'
import NowPlayingModal from '../containers/NowPlayingModal'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'


import { getImageForStationId } from '../utils/utils'

let widthToHeightRatio = 0.8

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stations: require('../resources/docs/radiostations.json'),
            mainViewWidth: 0,
            showModalPlayer:false
        }

        this.onModalClose = this.onModalClose.bind(this)
        this.adFailedToLoad = this.adFailedToLoad.bind(this)
    }
    componentDidMount() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        this.streamSelectedStation()
    }

    componentWillMount() {

        this.setState({
            selectedStation: this.state.stations[0]
        })
    }

    adFailedToLoad(error) {

        alert(error)

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
                    this.setState({
                        selectedStation: item,
                        showModalPlayer: true
                    })
                    this.streamSelectedStation()
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

    streamSelectedStation() {
        console.log("STATION INFO: " + JSON.stringify(this.state.selectedStation))
        TrackPlayer.reset();
        TimerMixin.setTimeout(() => {
            TrackPlayer.setupPlayer({});

            TrackPlayer.add({
                id: this.state.selectedStation + "",
                url: this.state.selectedStation.streamingURL, //this.state.selectedStation.streamingURL, // just for test!
                title: this.state.selectedStation.name,
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
                    <NowPlayingModal onModalClose={this.onModalClose} station={this.state.selectedStation} />
                )}

                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    onAdFailedToLoad={this.adFailedToLoad}
                />


            </View>)

    }
}