import React, { useContext, useState } from 'react'
import { StyleSheet, Text,View, TextInput, TouchableOpacity,StatusBar,KeyboardAvoidingView,Dimensions, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import {global} from './App'


const {height} = Dimensions.get('window')

const Acesso = ({navigation})=>{
    
    const [conected, date] = useContext(global)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const logar = () =>{
        if(conected){
            if(date){
                setLoading(true)
                setErro('')
                if((email)&&(password)){
                    auth().signInWithEmailAndPassword(email, password)
                    .then(() => {
                        // Signed in
                        setEmail('')
                        setPassword('')
                        setLoading(false)
                        navigation.navigate('Admin')
                    })
                    .catch((error) => {
                        setErro(error.message);
                        setLoading(false)
                    });
                }else{
                    setErro('Preencha Email ou Password!')
                    setLoading(false)
                }
            }else{
                Alert.alert("Data do celular incorreta!\n Reinicie o aplicativo")
            }
        }else{
            Alert.alert('Verifique sua conexão com a internet!')
        }
    }

    return(
        <KeyboardAvoidingView behavior='height' enabled={false} style={{flex:1,backgroundColor:'#F0F8FF'}}>
            <View style={styles.container}>
                <TextInput  style={styles.input} placeholder='Email' onChangeText={(value)=>setEmail(value)}>{email}</TextInput>
                <TextInput keyboardType='numeric' style={styles.input} placeholder='Senha' onChangeText={(value)=>setPassword(value)}secureTextEntry={true}>{password}</TextInput>
                <TouchableOpacity style={styles.buton} onPress={()=>logar()}>
                    <Text style={{fontWeight:'700',fontSize:height*0.021,color:'white'}}>Login</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
            <View style={{width:'80%',alignSelf:'center',alignItems:'center'}}>
                <Text style={{color:'red'}}>{erro}</Text>
            </View>
            {loading&&<ActivityIndicator style={styles.loading} size='large' color='orange'/>}
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
    },
    loading:{
        position:'absolute',
        alignSelf:'center',
        top:height/3
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

export default Acesso;

