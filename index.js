import {AppRegistry} from 'react-native';
import App from './screens/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
import {Alert,LogBox} from 'react-native'
import PushNotification from "react-native-push-notification";

messaging().setBackgroundMessageHandler(async remoteMessage => {
    setTimeout(async() => {
      let title = JSON.stringify(remoteMessage.notification.title)
      let body = JSON.stringify(remoteMessage.notification.body)
      Alert.alert('Nova notificação',`\t\t\t\t\t\t${title}\n\n ${body}`);
    }, 500);
});

PushNotification.configure({
  
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  permissions:{
    alert:true,
    badge:true,
    sound:true,
    vibrate:true
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
});

PushNotification.createChannel(
  {
    channelId: "1428", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  }
);

LogBox.ignoreAllLogs(true)
AppRegistry.registerComponent(appName, () => App);
