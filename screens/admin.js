import firestore from '@react-native-firebase/firestore'
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text,View, FlatList, ActivityIndicator,TouchableOpacity, Alert, Dimensions } from 'react-native';
import {global} from './App'

const {height} = Dimensions.get('window')

const Admin = ({navigation}) =>{
    const [conected] = useContext(global)
    const [resultados, setResultados] = useState([])
    const [dia, setDia] = useState({total:0,Motivado:0,normal:0,Desmotivado:0,sugestao:0})
    const [semana, setSemana] = useState({total:0,Motivado:0,normal:0,Desmotivado:0,sugestao:0})
    const [mes, setMes] = useState({total:0,Motivado:0,normal:0,Desmotivado:0,sugestao:0})
    const [loading, setLoading] = useState(false)

    const classify = (dados)=>{
        let dia = new Date().getDate()
        let mes = new Date().getMonth()+1
        let ano = new Date().getFullYear()
        let date = `${dia}/${mes}/${ano}`

        let total = 0
        let Motivado = 0
        let normal = 0
        let Desmotivado = 0
        let sugestao = 0

        //carrega dia
        dados.data.map((item,index)=>{
            if(item == date){
                total += 1
                switch (dados.meu_humor[index]){
                    case 'Motivado':
                        Motivado += 1
                        break
                    case 'normal':
                        normal += 1
                        break
                    case 'Desmotivado':
                        Desmotivado += 1
                        break
                    default:
                }
                if(dados.sugestao[index]){
                    sugestao += 1
                }
            }
        })
        setDia({total:total,Motivado:Motivado,normal:normal,Desmotivado:Desmotivado,sugestao:sugestao})

        total = 0
        Motivado = 0
        normal = 0
        Desmotivado = 0
        sugestao = 0

        //carrega semana
        if(dia >= 7){
            for(let i=0;i<=6;i++){
                dados.data.map((item,index)=>{
                    if(item == `${dia-i}/${mes}/${ano}`){
                        total += 1
                        switch (dados.meu_humor[index]){
                            case 'Motivado':
                                Motivado += 1
                                break
                            case 'normal':
                                normal += 1
                                break
                            case 'Desmotivado':
                                Desmotivado += 1
                                break
                            default:
                        }
                        if(dados.sugestao[index]){
                            sugestao += 1
                        }
                    }
                })
            }
            setSemana({total:total,Motivado:Motivado,normal:normal,Desmotivado:Desmotivado,sugestao:sugestao})

        }else{
            let diferença = 7 - dia
            for(let i = dia;i>=1;i--){
                dados.data.map((item,index)=>{
                    if(item == `${i}/${mes}/${ano}`){
                        total += 1
                        switch (dados.meu_humor[index]){
                            case 'Motivado':
                                Motivado += 1
                                break
                            case 'normal':
                                normal += 1
                                break
                            case 'Desmotivado':
                                Desmotivado += 1
                                break
                            default:
                        }
                        if(dados.sugestao[index]){
                            sugestao += 1
                        }
                    }
                })
            }
            let index = 0
            for(let i = 31;i>=28;i--){
                index = dados.data.find(item=>item == `${i}/${mes-1}/${ano}`)
                if(index != undefined){
                    index = i
                    i = 27
                }
            }

            if (index == undefined){
                setSemana({total:total,Motivado:Motivado,normal:normal,Desmotivado:Desmotivado,sugestao:sugestao})
            }else{
                for(let i = 0;i<diferença;i++){
                    dados.data.map((item,indice)=>{
                        if(item == `${index-i}/${mes-1}/${ano}`){
                            total += 1
                            switch (dados.meu_humor[indice]){
                                case 'Motivado':
                                    Motivado += 1
                                    break
                                case 'normal':
                                    normal += 1
                                    break
                                case 'Desmotivado':
                                    Desmotivado += 1
                                    break
                                default:
                            }
                            if(dados.sugestao[indice]){
                                sugestao += 1
                            }
                        }
                    })
                }
                setSemana({total:total,Motivado:Motivado,normal:normal,Desmotivado:Desmotivado,sugestao:sugestao})
            }
        }
        total = 0
        Motivado = 0
        normal = 0
        Desmotivado = 0
        sugestao = 0

        //carrega mes
        dados.data.map((item,index)=>{
            for(let i=dia;i>=1;i--){
                if(item == `${i}/${mes}/${ano}`){
                    total += 1
                    switch (dados.meu_humor[index]){
                        case 'Motivado':
                            Motivado += 1
                            break
                        case 'normal':
                            normal += 1
                            break
                        case 'Desmotivado':
                            Desmotivado += 1
                            break
                        default:
                    }
                    if(dados.sugestao[index]){
                        sugestao += 1
                    }
                }
            }
            for(let i=dia;i<=31;i++){
                if(item == `${i}/${mes-1}/${ano}`){
                    total += 1
                    switch (dados.meu_humor[index]){
                        case 'Motivado':
                            Motivado += 1
                            break
                        case 'normal':
                            normal += 1
                            break
                        case 'Desmotivado':
                            Desmotivado += 1
                            break
                        default:
                    }
                    if(dados.sugestao[index]){
                        sugestao += 1
                    }
                }
            }
        })
        setMes({total:total,Motivado:Motivado,normal:normal,Desmotivado:Desmotivado,sugestao:sugestao})
        setLoading(false)
    }

    const getDados = () => {
        setLoading(true)
        let data = {meu_humor:[],data:[],sugestao:[],id:[]}
        let desmotivados = {id:[],sugestao:[],data:[]}
        firestore().collection('meuHumor').orderBy('data','asc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc,index) => {
                data.meu_humor.push(doc.data().meu_humor)
                data.data.push(doc.data().data)
                data.sugestao.push(doc.data().sugestao)
                data.id.push(index)
                if((doc)&&(doc.data().meu_humor == 'Desmotivado')){
                    desmotivados.id.push(index)
                    desmotivados.sugestao.push(doc.data().sugestao)
                    desmotivados.data.push(doc.data().data)
                }
            })
            setResultados(desmotivados)
            classify(data)
            })
            .catch((error) => {
                Alert.alert("Error getting documents: ", error);
                setLoading(false)
            });     
    }

    const goCharts = ()=>{
        navigation.navigate('Gráfico', {dia:dia,semana:semana,mes:mes})
    }

    useEffect(()=>{
        if(conected){
            getDados()
        }
    },[])



    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight:'700',fontSize:height*0.025}}>
                    Desmotivados
                </Text>
            </View>
            {loading?
            <View style={{width:'99%',height:'80%'}}>
                <ActivityIndicator style={styles.loading} color='orange' size='large'/>
            </View>:
            <FlatList 
                data={resultados.id}
                renderItem={({ item,index }) => (
                    <View style={styles.flatlist}>
                        <Text style={styles.text}>"{resultados.sugestao[index]}"</Text>
                        <Text style={{color:'white',margin:5,alignSelf:'flex-end',fontSize:height*0.02}}>Dia: {resultados.data[index]}</Text>
                    </View>
                  )}
                keyExtractor={(item,index) => (item+index).toString()}
            />
            }
            <TouchableOpacity style={styles.header} onPress={goCharts}>
                <Text style={styles.text_buton}>Acessar Gráficos</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#DCDCDC'
    },
    loading:{
        alignSelf:'center',
        marginTop:20,
    },
    header:{
        alignSelf:'center',
        width:'98%',
        height:'10%',
        backgroundColor:'#7B68EE',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:height*0.01
    },
    flatlist:{
        width:'98%',
        alignSelf:'center',
        alignItems:'center',
        margin:5,
        backgroundColor:'#00008B',
        borderRadius:20
    },
    text:{
        fontSize:height*0.023,
        margin:20,
        color:'white'
    },
    text_buton:{
        fontSize:height*0.022,
        color:'white'
    }
})

export default Admin;