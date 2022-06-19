import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, TextInput, StatusBar, KeyboardAvoidingView, ActivityIndicator, Dimensions, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import feliz from './emoji/feliz.jpg'
import neutro from './emoji/neutro.jpg'
import triste from './emoji/triste.png'
import wifi_not from './emoji/not.png'
import wifi_yes from './emoji/yes.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sendPushNotification from './message'
import messaging from '@react-native-firebase/messaging'
import {global} from './App'
import notificaçao from './notification';


const font = Dimensions.get('window').width*0.032
const {width, height} = Dimensions.get('window')

export default function Home({navigation}) {
  const [conected, date] = useContext(global)
  const [select, setSelect] = useState({Motivado:false,normal:false,Desmotivado:false})
  const [sugestao, setSugestao] = useState()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
      notificaçao(false, false)
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        let title = JSON.stringify(remoteMessage.notification.title)
        let body = JSON.stringify(remoteMessage.notification.body)
        Alert.alert('Nova notificação',`\t\t\t\t\t\t${title}\n\n ${body}`);
      });
      return unsubscribe;
  },[])

  

  useEffect(() => {
  },[conected])

  const add = (data) =>{
    let humor = ''
    if(select.Motivado){
      humor = 'Motivado'
    }else if(select.normal){
      humor = 'normal'
    }else{
      humor = 'Desmotivado'
    }

    if(humor != 'Desmotivado'){
        firestore().collection('meuHumor').add({
          meu_humor: humor,
          data: data,
          sugestao:sugestao
        })
        .then(async() => {
            setResult("Obrigado por participar!");
            setSugestao('')
            setLoading(false)
            if(sugestao){
              sendPushNotification('Publicação Nova',sugestao)
            }
            await AsyncStorage.setItem('data',data)
        })
        .catch((error) => {
            setResult("Erro ao enviar!");
            setLoading(false)
        })
    }else{
        if(sugestao){
          firestore().collection('meuHumor').add({
            meu_humor: humor,
            data: data,
            sugestao:sugestao
          })
          .then(async() => {
              setResult("Obrigado por participar!");
              setSugestao('')
              setLoading(false)
              await AsyncStorage.setItem('data',data)
          })
          .catch((error) => {
              setResult("Erro ao enviar!");
              setLoading(false)
          })
        }else{
          setLoading(false)
          setResult('Preencha o porque está desmotivado!')
        }
    }
    setSugestao('')
  }

  const selectHumor = (id)=>{

    switch (id){
      case 'Motivado':
        setSelect({Motivado:true,normal:false,Desmotivado:false})
        break
      case 'normal':
        setSelect({Motivado:false,normal:true,Desmotivado:false})
        break
      case 'Desmotivado':
        setSelect({Motivado:false,normal:false,Desmotivado:true})
        break
      default:
        setSelect({Motivado:false,normal:false,Desmotivado:false})
    }
  }

  const send =async () =>{
    if(conected){
      if(date){
        if((select.Motivado)||(select.normal)||(select.Desmotivado)){
          setLoading(true)
          let dia = new Date().getDate()
          let mes = new Date().getMonth()+1
          let ano = new Date().getFullYear()
          let data = `${dia}/${mes}/${ano}`
          let dados = await AsyncStorage.getItem('data')
          if (dados != data){
            add(data)
          }else{
            setResult('Você já participou hoje!')
            setSugestao('')
            setLoading(false)
          }
        }else{
          setResult('Escolha um Emoji!')
        }
      }else{
        Alert.alert("Data do celular incorreta!\n Reinicie o aplicativo")
      }
    }else{
      
      Alert.alert('Por favor verifique sua conexão com a internet!')
    }
  }

 
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={{width:width*0.08,height:width*0.08,position:'absolute',top:5,right:15}}>
        <Image source={conected?wifi_yes:wifi_not} style={conected?styles.wifi_blue:styles.wifi_red} ></Image>
      </View>
      <Text style={{fontSize:font*1.5,alignSelf:'center',color:'blue'}}>Como você está se sentindo hoje?</Text>
      <View style={styles.header}>

        <TouchableOpacity style={select.Motivado?styles.buton1:styles.buton} onPress={()=>selectHumor('Motivado')}>
          <Image source={feliz} style={select.Motivado?{width:width*0.22,height:width*0.22}:{width:width*0.15,height:width*0.15}}/>
          <Text style={{fontSize:font,color:'blue'}}>Motivado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={select.normal?styles.buton1:styles.buton} onPress={()=>selectHumor('normal')}>
          <Image source={neutro} style={select.normal?{width:width*0.22,height:width*0.22}:{width:width*0.15,height:width*0.15}}/>
          <Text style={{fontSize:font,color:'orange'}}>Normal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={select.Desmotivado?styles.buton1:styles.buton} onPress={()=>selectHumor('Desmotivado')}>
          <Image source={triste} style={select.Desmotivado?{width:width*0.22,height:width*0.22}:{width:width*0.15,height:width*0.15}}/>
          <Text style={{fontSize:font,color:'red'}}>Desmotivado</Text>  
        </TouchableOpacity>

      </View>
      <KeyboardAvoidingView behavior='height' style={styles.sugestao}>
        <TextInput style={styles.input} placeholder={select.Desmotivado?'Porque está desmotivado?':'Digite uma frase motivacional!'} onChangeText={(value)=>setSugestao(value)} multiline={true} value={sugestao} keyboardType={'twitter'}/>
        {loading?<ActivityIndicator size='large' color='orange'></ActivityIndicator>:
        <Text style={{color:'red', fontWeight:'500',fontSize:font}}>{result}</Text>}
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.enviar} onPress={send}>
          <Text style={{fontWeight:'700',color:'white'}}>Enviar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
  },
  wifi_red:{
    width: width*0.08,
    height: width*0.08,
    tintColor:'red'
  },
  wifi_blue:{
    width: width*0.08,
    height: width*0.08,
    tintColor:'blue'
  },
  header:{
    width:'100%',
    height:'25%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  sugestao:{
    width:'100%',
    height:'25%',
    alignItems:'center',
    justifyContent:'space-around'
  },
  buton:{
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
    height:'99%'
  },
  buton1:{
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
    height:'99%'
  },
  input:{
    width:width*0.8,
    height:height*0.1,
    textAlign:'center',
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    fontSize:font
  },
  enviar:{
    width:'20%',
    height:'5%',
    borderRadius:10,
    backgroundColor:'#7B68EE',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
});
