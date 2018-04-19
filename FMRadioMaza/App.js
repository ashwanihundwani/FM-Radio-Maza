// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import { View, NativeEventEmitter, NativeModules, AsyncStorage } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import DrawerContainer from './app/containers/Drawer/DrawerContainer'
import Home from './app/containers/Home'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  Home: { screen: Home, navigationOptions: { title: "FM Radio Maza" } },

}, {
    gesturesEnabled: false,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerBackgroundColor: "gray",
    contentComponent: DrawerContainer,
    drawerWidth: 210
  })

function getIconStyle() {
  return { paddingLeft: 8, marginTop: 0 }
  
}

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#E6E6E6' },
      headerTitleStyle: { fontWeight: "600", fontSize: 13 },
      headerTintColor: "#666666",
      title: "FM Radio Maza",
      gesturesEnabled: false,
      headerLeft: <View style={getIconStyle()}><Icon type='font-awesome' color="gray" name="bars" size={25} onPress={() => {
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }}></Icon></View>
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

