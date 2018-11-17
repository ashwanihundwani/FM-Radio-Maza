import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, BackHandler } from 'react-native'
import { Icon, } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { Share } from 'react-native';
import MailCompose from 'react-native-mail-compose';

//We will ask you to rate us 5 star. If you feel this app is worth it, do rate us on app store. You can provide feedback by using "Give Feedback" option in menu"
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

  shareApp() {
    Share.share({
      message: 'Listen music from best radio stations - Red FM, Radio Mirchi & many more. Download app from https://play.google.com/store/apps/details?id=com.css.selfhealing&hl=en',
      url: undefined,
      title: 'Best Radio Stations in India'
    }, {
      // Android only:
      dialogTitle: 'FM Radio Maza',
    })
  }

  addAppVersionItem(text) {
    return (<View style={{marginTop:60}}>
      <Text
        style={styles.appVersionText}>
        {text}
      </Text>
    </View>)
  }

  async sendMail() {
    try {
      await MailCompose.send({
        toRecipients: ["awesomeappstudio@gmail.com"],
        subject: 'Feedback - FMRadioMaza',
         // Or, use this if you want html body. Note that some Android mail clients / devices don't support this properly.
      });
    } catch (e) {
        alert("Error in sending mail: " + e)
      // e.code may be 'cannotSendMail' || 'cancelled' || 'saved' || 'failed'
    }
}

  addDrawerItem(text, icon, action) {
    return (<View><View style={styles.drawerItem}>
      <View style={styles.drawerItemIconContainer}>
        <Icon name={icon} color="black" type='font-awesome' size={20} />
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
        {this.addDrawerItem("Share App", "share", ()=> this.shareApp())}
        {this.addDrawerItem("Give Feedback", "home", ()=> 
          this.sendMail()
        )}
        {this.addDrawerItem("Go Ads Free", "th-large", ()=> navigation.navigate('Spaces'))}
        {this.addAppVersionItem("Version 1.0.0")}
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
    color: 'black',
    marginLeft: 15,
    paddingTop: 20,
    paddingBottom: 10
  },
  childItemText:{
    flex:1,
    fontSize: 14,
    fontWeight: '300',
    color: 'black',
    marginLeft: 50,
  },
  separatorStyle: {
    height: 0.5,
    backgroundColor: "black",
    marginLeft: 50
  },
  appVersionText: {
    flex:1,
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginLeft: 15,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign:"center"
  },
})
