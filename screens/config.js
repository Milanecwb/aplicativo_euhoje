import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text,View, TextInput, TouchableOpacity,StatusBar,KeyboardAvoidingView,Dimensions, Alert } from 'react-native';
import notificaçao from './notification';


const {height} = Dimensions.get('window')

const Config = ({navigation})=>{
    const [horas, setHoras] = useState('');

    const salvar =async () => {
        if(horas > 0 && horas < 4){
            await AsyncStorage.setItem('message_config', horas);
            await AsyncStorage.setItem('cancel', 'false');
            notificaçao(false, horas);
            Alert.alert('Novo intervalo '+ horas + ' Hora(s)');
        }else{
            Alert.alert('Digite um número de 1 a 3 !')
        }
        setHoras('');
    }

    const excluir =async () => {
        await AsyncStorage.removeItem('message_config');
        Alert.alert('Notificação de Água Desligada')
        notificaçao(true, false);
    }

    return(
        <KeyboardAvoidingView behavior='height' enabled={false} style={{flex:1,backgroundColor:'#F0F8FF', alignItems:"center"}}>
            <View style={styles.container}>
                <Text style={{fontWeight:"700"}}>Digite um Intervalo</Text>
                <TextInput keyboardType='numeric' style={styles.input} placeholder='Horas' onChangeText={(value)=>setHoras(value)} maxLength={1}>{horas}</TextInput>
                <TouchableOpacity style={styles.buton} onPress={()=>salvar()}>
                    <Text style={{fontWeight:'700',fontSize:height*0.021,color:'white'}}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buton} onPress={()=>excluir()}>
                    <Text style={{fontWeight:'700',fontSize:height*0.021,color:'white'}}>Desligar Notificação</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
            <Text style={{position:'absolute', bottom:15, color:'gray'}}>Digite um intervalo de horas para ser lembrado de beber água. Ou desligue se quiser.</Text>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:'30%',
        alignSelf:'center',
        backgroundColor:'#F0F8FF',
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:10,
        marginTop:30
    },
    input:{
        backgroundColor:'#B0C4DE',
        width:'90%',
        height:'25%',
        borderRadius:5,
        fontSize:height*0.02,
        textAlign:'center',
        textAlignVertical:'center'
    },
    buton:{
        width:'90%',
        height:'25%',
        alignItems:'center',
        backgroundColor:'#7B68EE',
        borderRadius:10,
        justifyContent:'center',
    }
})

export default Config;