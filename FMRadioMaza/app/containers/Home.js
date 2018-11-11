import {
    FlatList, ScrollView, Text, TextInput, View, Button, StyleSheet, Image,
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
import { Provider } from 'react-redux';
import MiniPlayer from '../containers/MiniPlayer'
import WebApi from '../libs/webApi'
import renderIf from '../utils/renderIf'
import NowPlayingModal from '../containers/NowPlayingModal'
import { connectedToNetwork, observeNetworkConnection, addToRecentlyPlayed } from '../utils/utils'
import { fetchStations, fetchRecentStations, fetchFavouriteStations } from '../actions/action'
import { connect } from 'react-redux';
import store from '../store';
import { bindActionCreators } from 'redux';
import { playStation } from '../actions/action'
import { getImageForStationId } from '../utils/utils'

let widthToHeightRatio = 0.8

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stations: require('../resources/docs/radiostations.json'),
            mainViewWidth: 0,
            showModalPlayer: false,
            showAdBanner: true
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
        this.props.fetchStations()
        this.props.fetchRecentStations()
        this.props.fetchFavouriteStations()

        observeNetworkConnection((networkConnected) => {

            if (networkConnected === true) {
                this.setState({
                    showAdBanner: true

                })
            }
            else {
                this.setState({
                    showAdBanner: false
                })
            }

        })

        // this.setState({
        //     selectedStation: this.props.stations[0] === null ? undefined : this.props.stations[0]
        // })
    }

    showFullAd() {
        AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() =>
            AdMobInterstitial.showAd()
        ).catch((error) => {

            console.log(JSON.stringify(error))

        });
    }

    componentWillMount() {

    }

    adFailedToLoad(error) {
        this.setState({
            showAdBanner: false
        })

    }

    calculateItemWidth() {
        return 120
    }

    calculateItemHeight() {
        return 120
    }

    renderItem = ({ item, index }) => (
        <View>
            <TouchableHighlight
                onPress={() => {
                    this.setState({
                        showModalPlayer: true
                    })
                    this.props.playStation(item)
                    addToRecentlyPlayed(item)
                    TimerMixin.setTimeout(()=> {
                        this.props.fetchRecentStations()
                    }, 500)

                }}>
                <View style={{
                    marginLeft: 5,
                    marginRight: 5,
                    borderColor: "#c8c8c8",
                    borderWidth: 1,
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

    onModalClose() {
        this.setState({
            showModalPlayer: false
        })
    }
    render() {
        return (
            <Provider store={store}>
                <View onLayout={(event) => {
                    this.setState({
                        mainViewWidth: event.nativeEvent.layout.width
                    })
                }} style={{ flex: 1, backgroundColor: "white" }}>
                    <ScrollView>
                        {renderIf(this.props.recentStations !== undefined && this.props.recentStations.length > 0,
                            <View>
                                <View style={{ top: 10, marginBottom: 20 }}>
                                    <View style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10, marginBottom: 10 }}>Recently Played</Text>
                                        <Text style={{ fontSize: 15, color: "blue" }} onPress={() => this.props.na}>See All</Text>
                                    </View>
                                    <FlatList

                                        data={this.props.recentStations}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => item.id}
                                    >
                                    </FlatList>
                                    <View style={{ backgroundColor: "#e6e6e6", height: 5 }} />
                                </View>

                            </View>)}
                        {renderIf(this.props.favouriteStations !== undefined && this.props.favouriteStations.length > 0,
                            <View>
                                <View style={{ top: 10, marginBottom: 20 }}>
                                    <View style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10, marginBottom: 10 }}>Favourite Stations</Text>
                                        <Text style={{ fontSize: 15, color: "blue" }} onPress={() => alert("See All Pressed")}>See All</Text>
                                    </View>

                                    <FlatList

                                        data={this.props.favouriteStations}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => item.id}
                                    >
                                    </FlatList>
                                </View>
                                <View style={{ backgroundColor: "#e6e6e6", height: 5 }} />
                            </View>)}
                        <View style={{ top: 10, marginBottom: 20 }}>
                            <View style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10, marginBottom: 10 }}>All Stations</Text>
                                <Text style={{ fontSize: 15, color: "blue" }} onPress={() => alert("See All Pressed")}>See All</Text>
                            </View>
                            <FlatList

                                data={this.props.stations}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            >
                            </FlatList>
                        </View>
                        <View style={{ backgroundColor: "#e6e6e6", height: 5 }} />
                    </ScrollView>
                    {/* <GridList style={{

                    paddingLeft: 10,
                    marginLeft: 20,
                    marginBottom: 20
                }}
                    showSeparator
                    data={this.props.stations}
                    numColumns={2}
                    renderItem={this.renderItem}
                /> */}
                    {renderIf(this.state.showModalPlayer === false
                        && this.props.playingStation !== undefined,
                        <MiniPlayer
                            station={this.state.selectedStation} />
                    )}

                    {renderIf(this.state.showModalPlayer === true,
                        <NowPlayingModal showFullAd={this.showFullAd} onModalClose={this.onModalClose} station={this.state.selectedStation} />
                    )}

                    {renderIf(this.state.showAdBanner === true
                        && connectedToNetwork() === true,
                        <AdMobBanner
                            adSize="fullBanner"
                            adUnitID="ca-app-pub-3940256099942544/6300978111"
                            onAdFailedToLoad={this.adFailedToLoad}

                        />)}
                </View></Provider>)

    }
}

function mapStateToProps(state) {
    const stations = state.playback.stations;
    const recentStations = state.playback.recentStations
    const favouriteStations = state.playback.favouriteStations
    return {
        stations: stations,
        recentStations: recentStations,
        favouriteStations: favouriteStations,
        state: state.playback.state,
        playingStation: state.playback.playingStation
    };
}


module.exports = connect(mapStateToProps, { fetchStations, fetchRecentStations, fetchFavouriteStations, playStation })(Home);