import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import iconPlay from '../resources/images/play.png';
import iconPause from '../resources/images/pause.png';
import {getImageForStationId} from '../utils/utils'

export default class MiniPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trackPlayerState: TrackPlayer.STATE_PLAYING
        }
    }

    _openNowPlaying() {
        
    }

    _togglePlayPause() {
        alert("ddd")
        if(this.state.trackPlayerState == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
            this.setState({
                trackPlayerState:TrackPlayer.STATE_PLAYING
            })
        } else {
            TrackPlayer.pause();
            this.setState({
                trackPlayerState:TrackPlayer.STATE_PAUSED
            })
        }
    }

    render() {

        
        // if(this.state.trackPlayerState == TrackPlayer.STATE_NONE || this.state.trackPlayerState == TrackPlayer.STATE_STOPPED) {
        //     return <View />;
        // }

        return (
            <View style={styles.player}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.wide} onPress={this._openNowPlaying.bind(this)}>
                        <View style={styles.metadata}>
                            <Image
                                /*source={getImageForStationId(this.props.station.id)}*/
                                style={styles.artwork}
                            />
                            <View style={styles.info}>
                                <Text style={styles.title}>{this.props.station.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._togglePlayPause.bind(this)}>
                        <Image
                            source={this.state.trackPlayerState == TrackPlayer.STATE_PAUSED ? iconPlay : iconPause}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    player: {
        elevation: 5,
        backgroundColor: 'black'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        height: 2,
        backgroundColor: '#03A9F4'
    },
    wide: {
        flex: 1
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
    },
    artwork: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius:25
    },
    info: {
        paddingLeft: 5,
        paddingRight: 5
    },
    title: {
        color: '#e6e6e6',
        fontSize: 15,
        fontWeight: '500',
        marginRight:10
    },
    artist: {
        color: '#9a9a9a',
        fontSize: 14,
        fontWeight: '300'
    },
    icon: {
        height: 50,
        width: 50,
        margin: 10
    }
});

/* MiniPlayer.propTypes = {
    state: PropTypes.number,
    track: PropTypes.object
}; */

function mapStateToProps(state) {
    const currentTrack = state.playback.currentTrack;
    const currentTracks = state.playback.dataTracks;

    return {
        state: state.playback.state,
        track: currentTracks ? currentTracks.find((track) => track.id == currentTrack) : null
    };
}
