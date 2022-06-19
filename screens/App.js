import * as React from 'react';
import {useEffect, useState,createContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import messaging from '@react-native-firebase/messaging'
import {Alert, Dimensions} from 'react-native'
import Home from './home'
import Acesso from './acesso'
import Admin from './admin'
import Charts from './charts'
import Frases from './frases'
import Config from './config';
import NetInfo from "@react-native-community/netinfo"
import auth from '@react-native-firebase/auth'
import sendAniversario from './aniversario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import get_time from './timezone'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const global = createContext({});

const {width} = Dimensions.get('window')

function App() {
  const [loged, setLoged] = useState(false)
  const [conected, setConected] = useState(false)
  const [date, setDate] = useState(false)

  const signin = () =>{
    auth().signInAnonymously()
    .then(()=>{
      console.log('logado')
      setLoged(true)
      sendAniversario()
    })
    .catch((error)=>{
      console.log(error)
      setLoged(false)
    })
  }

  const subs_topic =async ()=>{
    let topic = await AsyncStorage.getItem('topic')
    if(!topic){
      messaging().subscribeToTopic('qualidade')
      .then(async(response) => {
        await AsyncStorage.setItem('topic','ok')
        console.log('Successfully subscribed to topic:', response);
      })
      .catch(function(error) {
        console.log('Error subscribing to topic:', error);
      });
    }
  }

  useEffect(()=>{
      const unsubscribe = NetInfo.addEventListener(async state => {
        if(state.isConnected){
          setConected(true)  
          let data = await get_time()
          let dia = new Date().getDate()
          let mes = new Date().getMonth()+1
          let ano = new Date().getFullYear()
          let cel_data = dia+"/"+mes+"/"+ano

          if( data == cel_data){
            setDate(true)
          }else{
            setDate(false)
          } 

          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
          });
      
      
          messaging()
            .getInitialNotification()
            .then(remoteMessage => {
              if (remoteMessage) {
                console.log(
                  'Notification caused app to open from quit state:',
                  remoteMessage.notification,
                );
              }
            });

          if(data == cel_data){
            subs_topic()
            signin()
          }else{
            Alert.alert("Data do celular incorreta!\n Reinicie o aplicativo")
          }
        }else{
          setConected(false)
          Alert.alert('Verifique sua conexão\n com a internet!')
        }
      });

      return () =>{
        unsubscribe();
        auth().signOut().then(()=>{
          console.log('logout')
        })
      }
  },[])

  const Adm = () => {
    return(
      <Stack.Navigator>
          <Stack.Screen  name="Login" component={Acesso} />
          <Stack.Screen  name="Admin" component={Admin} />
          <Stack.Screen  name="Gráfico" component={Charts} />
      </Stack.Navigator>
    )
  }

  return (
    <global.Provider value={[conected, loged, date, setLoged]}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{tabStyle:{
          justifyContent:'center'
        }, labelStyle:{fontSize:width*0.03,alignContent:'center'}}}>
          <Tab.Screen  name="Home" component={Home} />
          <Tab.Screen  name="Motivação" component={Frases}/>
          <Tab.Screen  name="Opções" component={Config}/>
          <Tab.Screen  name="Admin" component={Adm}/>
        </Tab.Navigator>
      </NavigationContainer>
    </global.Provider>
  );
}

export {global};
export default App;