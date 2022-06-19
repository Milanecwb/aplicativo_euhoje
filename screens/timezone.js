
const get_time = () =>{
        let lista_mes = {nome:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],id:['1','2','3','4','5','6','7','8','9','10','11','12'],dias:[31,28,31,30,31,30,31,31,30,31,30,31]}

        let url = 'https://www.google.com'
        
        return fetch(url).then(async(resp)=>{
                let response = await resp.headers.get('Date')
                let dia = parseInt(response.slice(5,7))
                let mes = response.slice(8,11)
                let ano = parseInt(response.slice(12,16))
                let hora = parseInt(response.slice(17,19))
                if(hora < 3 || hora == 24){
                        if(dia > 1){
                                dia = dia - 1
                                let index = lista_mes.nome.findIndex(indice => indice == mes)
                                return(dia+'/'+lista_mes.id[index]+'/'+ano)
                        }else{
                                let index = lista_mes.nome.findIndex(indice => indice == mes)
                                index = index - 1
                                mes = lista_mes.id[index]
                                dia = lista_mes.dias[index]
                                return(dia+'/'+lista_mes.id[index]+'/'+ano)
                        }  
                }else{
                        let index = lista_mes.nome.findIndex(indice => indice == mes)
                        return(dia+'/'+lista_mes.id[index]+'/'+ano)
        
                }
                  
        })
        
        
}
export default get_time;