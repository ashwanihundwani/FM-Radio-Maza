import React, { Component } from 'react';
import {
    View, ScrollView, Text, StatusBar,
    Button, StyleSheet, FlatList,
    TouchableHighlight, Dimensions, ActivityIndicator,
    TouchableOpacity, Image, Alert, Modal
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import iconPlay from '../../resources/play_black.png';
import iconPause from '../../resources/pause_black.png';
import iconPrevious from '../../resources/prev_black.png';
import iconNext from '../../resources/next_black.png';
import sampleIcon from '../../resources/kitchen.jpg';
import musicIcon from '../../resources/music.png';
import ImageButton from './ImageButton';
import { navigateScreen, openNowPlaying } from '../../actions/action';
import{bindActionCreators} from 'redux';

const windowHeight = Dimensions.get('window').height;
class NowPlayingModal extends Component {


    _playPause() {
        if (this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }

    async _previous() {
        // TODO add tracks to the queue
        TrackPlayer.skipToPrevious();

    }

    _next() {
        // TODO add tracks to the queue
        TrackPlayer.skipToNext();
    }

    closeModal() {
        console.log("Closing model from component");
        this.props.dispatch(openNowPlaying(false));
    }

    render() {
        return (
            <View>
                <Modal visible={this.props.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    transparent={true}>
                    <View style={styles.dialogContainer}>
                        <View style={styles.dialog}>
                            <Text style={{ alignSelf: 'center', paddingTop: 20, fontSize: 10, fontWeight: 'bold' }}
                                onPress={() => this.closeModal()}>
                                Press to View the list</Text>
                            <Image style={styles.modalImage}
                                source={this.props ? this.props.track ? { uri: this.props.track.artwork } : { musicIcon } : { musicIcon }}>
                            </Image>
                            <Text style={styles.songTitle}>
                                {this.props ? this.props.track ? this.props.track.title : "Unknown" : "Unknown"}</Text>
                            <ProgressBar />

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

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 10
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
        marginTop: 10,
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

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ openNowPlaying,navigateScreen });
    return { ...actions, dispatch };
  }

function mapStateToProps(state) {
    const currentTrack = state.playback.currentTrack;
    const currentTracks = state.playback.dataTracks;

    return {
        track: currentTracks ? currentTracks.find((track) => track.id == currentTrack) : null,
        state: state.playback.state
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(NowPlayingModal);
