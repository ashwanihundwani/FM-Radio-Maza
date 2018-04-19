import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, BackHandler } from 'react-native'
import { Icon, } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  constructor(props) {
    super(props);
    this.androidEventHandler = this.androidEventHandler.bind(this)
  }

 // Android back button handler start
  androidBackButtonAddEventListener() {
    BackHandler.addEventListener('hardwareBackPress', this.androidEventHandler)
  }
  androidEventHandler() {
    if (this.props.navigation.state.routeName === 'DrawerClose') { 
      BackHandler.exitApp()
      return true
    }
  }
  // Android back button handler end
  
  componentWillMount() {
    this.androidBackButtonAddEventListener()
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.androidEventHandler);
  }

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  addDrawerItem(text, icon, action) {
    return (<View><View style={styles.drawerItem}>
      <View style={styles.drawerItemIconContainer}>
        <Icon name={icon} color="white" type='font-awesome' size={20} />
      </View>
      <Text
        onPress={action}
        style={styles.drawerItemText}>
        {text}
      </Text>
    </View>
    <View style={styles.separatorStyle}></View></View>)
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        {this.addDrawerItem("User", "user", ()=> navigation.navigate(''))}
        {this.addDrawerItem("Home", "home", ()=> navigation.navigate('Home'))}
        {this.addDrawerItem("Spaces", "th-large", ()=> navigation.navigate('Spaces'))}
        {this.addDrawerItem("Routines", "calendar", ()=> navigation.navigate('CreateRoutine'))}
        {this.addDrawerItem("Media", "music", ()=> navigation.navigate(''))}
        {this.addDrawerItem("Notifications", "bell", ()=> navigation.navigate('Notifications'))}
        {this.addDrawerItem("Devices & Sensors", "lightbulb-o", ()=> navigation.navigate(''))}
        {this.addDrawerItem("Help", "question-circle", ()=> navigation.navigate('Help'))}
        {this.addDrawerItem("Developer Options", "code", ()=> navigation.navigate('DeveloperOptions'))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'gray',
  },
  header: {
    marginHorizontal: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  drawerItem: {
    flexDirection: "row"
  },

  drawerItemIconContainer: {
    marginLeft:15,
    paddingTop: 18,
  },

  drawerItemText: {
    flex:1,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginLeft: 15,
    paddingTop: 20,
    paddingBottom: 10
  },
  childItemText:{
    flex:1,
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    marginLeft: 50,
  },
  separatorStyle: {
    height: 0.5,
    backgroundColor: "white",
    marginLeft: 50
  }
})
