import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';


const notificaçao =async (cancel, alterar) => {
    
    if(!cancel){
        let message = await AsyncStorage.getItem('message_config');
        let cancelado = await AsyncStorage.getItem('cancel');

        if(!cancelado || cancelado == 'false'){
            if(!message){
              await AsyncStorage.setItem('message_config','3');
              message = '3';
            }
            if(alterar){
                PushNotification.cancelAllLocalNotifications();
            }
            PushNotification.getScheduledLocalNotifications(notify => {
                if(notify[0] == undefined){

                    PushNotification.localNotificationSchedule({
                      channelId: "1428",
                      title: "Lembrete", // (optional)
                      message: "Beba Água!", // (required)
                      date: new Date(Date.now() + 60 * 1000), // in 60 secs
                      playSound: true,
                      soundName: "default",
                      vibrate: true,
                      allowWhileIdle: false,
                      repeatType: "hour",
                      repeatTime: parseInt(message),
                      smallIcon:'notify'
                    })
                }
            });
        }
    }else{
        PushNotification.cancelAllLocalNotifications();
        await AsyncStorage.setItem('cancel', 'true');
    }
}

export default notificaçao;