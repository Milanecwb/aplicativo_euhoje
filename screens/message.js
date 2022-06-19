import { Alert } from "react-native"

const sendPushNotification = async (title,body,aniversario) => {
    try{
        const key = 'AAAAM-WS7Gc:APA91bFm9JzwLZcQHyYk_lqSaYbLzmY36yVp5SN9R-mSZISWQ2GfKUdlI_LdQj14j8Nfnqefji5jbSno6kl5FZ3raKOu2kPgqlKMlvzIXFj3yEnYXxzcoyxUXXICyeJ23n_ibX9DKgMk'
        let mensagem = 
        {
          "to": "/topics/qualidade",
          "notification":{
            "title": title,
            "body": body
          }
        }    
        
        let mensagem2 = 
        {
          "to": "/topics/qualidade",
          "notification":{
            "title":'Aniversário do dia!',
            "body": body + '  Parabéns pelo seu aniversario felicidades!!!'
          }
        }
        let response = await fetch('https://fcm.googleapis.com/fcm/send', {
          headers:{
            Accept: 'aplication/json',
            'Content-Type': 'application/json',
            'Authorization': 'key='+key
          },
          method:'POST',
          body: JSON.stringify(aniversario?mensagem2:mensagem)
        })
        return(await response)
    }catch(error){
      Alert.alert('Erro',error)
    }  
}
export default sendPushNotification;