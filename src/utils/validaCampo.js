export default function validaCampo(request){
    var result = {error: "", msgError:"", elementInvalid:[],elementValid:[]}
    Object.keys(request).map(key=>{
        if(request[key] === "" || request[key] === 0 || request[key] === undefined  ){
            if( key !== "id_workplace"){
                result.error = true;
                result.msgError = 'Há campos obrigatórios não informados'
                result.elementInvalid.push(key)
            }
        }else if(key === 'email'){
            if(!request[key].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                result.error = true
                result.msgError = 'Email inválido !'
            }  
        }else{
            result.elementValid.push(key)
        }
    })
    
    return result
}