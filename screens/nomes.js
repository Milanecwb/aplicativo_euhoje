import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const nomes = {
    nome:["Paulo Sergio Domingues","Marcelo Quintiliano","Adriano de Araújo Milane","Fernanda Pelanda de Oliveira","Marcelo José dos Santos","Darci Olyntho Silverio","Alex Rodrigo Ramos","Rogerio Cardoso","Fernando Emmanuel Taneguti","Vilson Cotta Filho","Valdir Pinheiro","Maria Martins Ferreira","Carlos Roberto Godoi","Cristiano da Silva de Castro","Edemilson Friebe","Elton da Silva","Laercio Jorge Aiub","Rodrigo Aurélio Feijó","Marcelo Espada do Nascimento","Redinaldo de Siqueira","Eziquiel dos Santos Moura","Elcio de Lima Fagundes","Antonio Teodoso da Costa","Sergio Cordeiro","Mauro Rodrigues de Souza","Denilson Falcondes","Edimilson Morais de Melo","Edilberto Clicerio Costa","Fernando Marcelo Lopez","Luciano Santos de Oliveira","Alexandre Aparecido Ferreira de Castro","Samuel Andre Graciano","Thiago"],
    data:["5/11/2021","15/01/2021","14/01/2021","17/10/2021","26/02/2021","28/07/2021","15/11/2021","19/03/2021","18/10/2021","04/08/2021","28/06/2021","05/09/2021","09/07/2021","05/06/2021","22/01/2021","23/12/2021","28/02/2021","27/01/2021","18/03/2021","23/09/2021","01/02/2021","19/07/2021","23/08/2021","19/03/2021","10/05/2021","20/09/2021","06/09/2021","21/04/2021","06/11/2021","23/02/2021","03/06/2021","29/06/2021","31/05/2021"]
}

const adicionar = () =>{
    auth().signInAnonymously().then(()=>
        nomes.nome.map((item,index)=>{
            firestore().collection('aniversariantes').add({
                nome: item,
                data: nomes.data[index],
                enviado: false
              })
        })   
    )
}




