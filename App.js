
import React, {Component} from 'react';
import {Platform, StyleSheet,Alert, Text, View} from 'react-native';
import SignUp from './Components/Views/SignUp';
import ForgotPassword from './Components/Views/ForgotPassword';
import Login from './Components/Views/Login';
import Menu from './Components/Views/Menu';
import firebase from 'react-native-firebase';
import Register from './Components/Views/Register';
import Chat from './Components/Views/Chat'
import {
  createStackNavigator
} from 'react-navigation'
 class App extends Component {

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line 
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;     
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
       // this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
       // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  
    render() {
      const MainNavigator = createStackNavigator({
        Menu: {screen: Menu},
        Login: {screen: Login},
        Register: {screen: Register},
        Menu: {screen: Menu},
        ForgotPassword: {screen: ForgotPassword},
        Chat: {screen: Chat},
      
      
      });
      return (
       <MainNavigator/>
      );
    }
  }



export default App;
