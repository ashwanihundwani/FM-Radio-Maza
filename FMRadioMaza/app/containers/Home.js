import {
    ScrollView, Text, TextInput, View, Button, StyleSheet, Image,
    TouchableHighlight, AsyncStorage, Color, BackHandler, NativeEventEmitter, NativeModules
} from 'react-native';
import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={{flex:1, justifyContent:"center", alignContent:"center", backgroundColor:"#F9F9F9" }}>
                <View style={{backgroundColor: "#F2F2F2", marginBottom:60, height:200, alignItems: "center" }}>      
                    <Text style={{ marginTop: 20 }}>Login Success!</Text>   
                </View>
            </View>)

    }
}