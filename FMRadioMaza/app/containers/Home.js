import {
    ScrollView, Text, TextInput, View, Button, StyleSheet, Image,
    TouchableHighlight, AsyncStorage, Color, BackHandler, NativeEventEmitter, NativeModules
} from 'react-native';
import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import GridList from 'react-native-grid-list';
import {
    Player,
    MediaStates
} from 'react-native-audio-toolkit';

let widthToHeightRatio = 0.8

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stations: require('../resources/docs/radiostations.json'),
            mainViewWidth: 0
        }
    }
    componentDidMount() {

        this.state.player = new Player("http://173.203.133.187:9700/stream/1/");
        this.state.player.play(() => {
            this.setState({ isPlaying: true });
        });
    }

getImage() {
    return require('../resources/add.png')
}

calculateItemWidth() {
    return this.state.mainViewWidth / 2 - 30
}

calculateItemHeight() {
    return (this.state.mainViewWidth / 2 - 30) * widthToHeightRatio
}

renderItem = ({ item, index }) => (
    <View>
        <View style={{
            shadowColor: "gray",
            elevation: 5,
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                height: 1,
                width: 0
            }, borderRadius: 10, backgroundColor: "white",
            marginTop: 13,
            marginBottom: 5,
            width: this.calculateItemWidth(),
            height: this.calculateItemHeight()
        }}>
            <Image style={{ borderRadius: 10, width: this.calculateItemWidth(), height: this.calculateItemHeight() }} source={require('../resources/images/redfm.jpeg')}></Image>
        </View>
    </View>
)
render() {
    return (
        <View onLayout={(event) => {
            this.setState({
                mainViewWidth: event.nativeEvent.layout.width
            })
        }} style={{ flex: 1, backgroundColor: "#C9D5E1" }}>
            <GridList style={{

                marginLeft: 20,
                marginBottom: 20
            }}
                showSeparator
                data={this.state.stations}
                numColumns={2}
                renderItem={this.renderItem}
            />
        </View>)

}

getImageForStation(stationId) {
    alert(stationId)
    switch (stationId) {
        case 1: {
            return require('../resources/images/redfm.jpeg')
        }
        case 2: {
            return require('../resources/images/redfm.jpeg')
        }
        case 3: {
            return require('../resources/images/redfm.jpeg')
        }
        case 4: {
            return require('../resources/images/redfm.jpeg')
        }
        case 5: {
            return require('../resources/images/redfm.jpeg')
        }
    }
}
}