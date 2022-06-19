import firestore from '@react-native-firebase/firestore'
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text,View,ActivityIndicator,FlatList, Dimensions, Alert } from 'react-native';
import {global} from './App'

const {height} = Dimensions.get('window')

export default Frases = () =>{
    const [conected, date] = useContext(global)
    const [loading, setLoading] = useState(false)
    const [resultados, setResultados] = useState([])
    const [aniver, setAniver] = useState(false)
    const [aniversariantes, setAniversariantes] = useState([])



    const getDados =async ()=>{
            let dia = new Date().getDate()
            let mes = new Date().getMonth()+1
            let ano = new Date().getFullYear()
            let date = `${dia}/${mes}/${ano}`
            let aniversariante = []
            let sugestao = []
            firestore().collection
            ('meuHumor').where('data','==',date).get().then((querySnapshot)=>{
                querySnapshot?.forEach((docs, index)=>{
                    if((docs.data().sugestao) && (docs.data().meu_humor != 'Desmotivado')){
                        if(docs.data().sugestao.slice(0,26) == 'Parabéns pelo aniversário:'){
                            aniversariante.push(docs.data().sugestao)
                            setAniver(true)
                        }else{
                            sugestao.push(docs.data().sugestao)
                        }
                    }
                })
                setAniversariantes(aniversariante)
                setResultados(sugestao)
                setLoading(false)
            })
            .catch((error)=>{
                setLoading(false)
                console.log(error)
            })
    }
    
    const autorization = ()=>{
        setLoading(true)
        getDados()
    }

    useEffect(()=>{
        if(conected){
            if(date){
                autorization()
            }else{
                Alert.alert("Data do celular incorreta!\n Reinicie o aplicativo")
            }
        }else{
            Alert.alert('Por favor verifique sua conexão com a internet!')
        }
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight:'700',fontSize:height*0.025}}>
                    Frases do dia
                </Text>
            </View>
            {loading?<ActivityIndicator style={styles.loading} size='large' color='orange'/>:null}
            {aniver&&
            aniversariantes.map((item,index)=>
            (<View key={index} style={styles.flatlist}>
                <Text style={styles.text}>"{item}"</Text>
            </View>))}
            <FlatList 
                data={resultados.sort()}
                renderItem={({ item,index }) => (
                    <View style={styles.flatlist}>
                        <Text style={styles.text}>"{item}"</Text>
                    </View>
                )}
                keyExtractor={(item,index) => (item+index).toString()}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF'
    },
    loading:{
        position:'absolute',
        top: height/2,
        alignSelf:'center'
    },
    header:{
        alignSelf:'center',
        width:'98%',
        height:'10%',
        backgroundColor:'#7B68EE',
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        borderRadius:height*0.01
    },
    flatlist:{
        width:'98%',
        alignSelf:'center',
        alignItems:'center',
        marginBottom:5,
        backgroundColor:'#00008B',
        borderRadius:20
    },
    text:{
        fontSize:height*0.023,
        margin:20,
        color:'white'
    }
})