import React, { Component } from 'react';
import {
    View, ScrollView, Text, StatusBar,
    Button, StyleSheet, FlatList,
    TouchableHighlight, Dimensions, ActivityIndicator,
    TouchableOpacity, Image, Alert, Modal
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import iconPlay from '../resources/images/play_black.png';
import iconPause from '../resources/images/pause_black.png';
import iconPrevious from '../resources/images/prev_black.png';
import iconNext from '../resources/images/next_black.png';
import ImageButton from './ImageButton';
import { getImageForStationId } from "../utils/utils";
import ModalWrapper from 'react-native-modal-wrapper';

const windowHeight = Dimensions.get('window').height;
export default class NowPlayingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trackPlayerState: TrackPlayer.STATE_PLAYING
        }
    }

    _playPause() {
        if (this.state.trackPlayerState === TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }

    async _previous() {
        // TODO add tracks to the queue
        //TrackPlayer.skipToPrevious();

    }

    _next() {
        // TODO add tracks to the queue
       // TrackPlayer.skipToNext();
    }

    closeModal() {
        console.log("Closing model from component");
    }

    render() {
        return (
            <View>
                <ModalWrapper
                containerStyle={{ flexDirection: 'row', alignItems: 'flex-end' }}
                style={{ flex: 1, height: '50%', borderTopLeftRadius: 17, borderTopRightRadius: 17, }}
                transparent={true}
                visible={true}
                animationType={'slide'}
                shouldCloseOnOverlayPress={true}
                shouldAnimateOnRequestClose={true}
                shouldAnimateOnOverlayPress={true}
                onRequestClose={() => this.props.onModalClose()}>

                    <View style={styles.dialogContainer}>
                        <View style={styles.dialog}>
                            <Image style={styles.modalImage}
                                /*source={getImageForStationId(this.props.station.id)}*/>
                            </Image>
                            <Text style={styles.songTitle}>
                                {this.props.station.name}</Text>
                            

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
                </ModalWrapper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 20,
        borderColor:"gray",
        borderWidth:2,
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

