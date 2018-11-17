// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import { View, NativeEventEmitter, NativeModules, AsyncStorage, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import DrawerContainer from './app/containers/Drawer/DrawerContainer'
import RadioIndex from './app/containers/RadioIndex'
import Stations from './app/containers/Stations'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  RadioIndex: { screen: RadioIndex, navigationOptions: { title: "FM Radio Maza" } },
  Stations : { screen: Stations},

}, {
    gesturesEnabled: false,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerBackgroundColor: "white",
    contentComponent: DrawerContainer,
    drawerWidth: 210
  })

function getIconStyle() {
  return { alignItems:"center", justifyContent:"center", height:44, width:44 }
  
}

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { fontWeight: "600", fontSize: 13 },
      headerTintColor: "black",
      title: "FM Radio Maza",
      gesturesEnabled: false,
      headerLeft: <TouchableOpacity underlayColor='#a1b4d4' onPress={() => {
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }} style={getIconStyle()}><Icon type='font-awesome' color="black" name="bars" size={20}></Icon></TouchableOpacity>
    })
  })

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  drawerStack: { screen: DrawerNavigation }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'drawerStack',
    transitionConfig: noTransitionConfig
  })

export default PrimaryNav

