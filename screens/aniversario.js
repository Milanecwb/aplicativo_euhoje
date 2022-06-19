import firestore from '@react-native-firebase/firestore'
import sendPushNotification from './message'


const sendAniversario = async () => {

        let dia1 = new Date().getDate()
        let dia = dia1<10?"0"+dia1:dia1
        let mes1 = new Date().getMonth()+1
        let mes = mes1<10?"0"+mes1:mes1
        let ano = new Date().getFullYear()
        let date = `${dia}/${mes}/${ano}`
        let date1 = `${dia1}/${mes1}/${ano}`
        let aniversariantes = ''
        firestore().collection('aniversariantes').where('data','==',date).get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(!doc.data().enviado){
                    firestore().collection('aniversariantes').doc(doc.id).update({
                        enviado: true
                    })
                    firestore().collection('meuHumor').add({
                        meu_humor: 'Motivado',
                        data: date1,
                        sugestao:'Parabéns pelo aniversário:\n'+doc.data().nome
                    })
                    aniversariantes += ' '+doc.data().nome+','
                }
            })
            if(aniversariantes){
    
                sendPushNotification('',aniversariantes,true)
            }
        })
        .catch((error)=>{
            console.log(error)
        })

}
export default sendAniversario;