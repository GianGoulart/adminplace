import axios from  'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import moment from 'moment/moment.js'
import 'sweetalert2/src/sweetalert2.scss'


var server = "localhost:3001"//(process.env.SERVER)
export default class Store {

    static reload(reload) {
        return dispatch => {
            dispatch({ type: 'RELOAD', reload });
        }
    }

    static autenticar(email, password, history){
        var senhaCriptografada = btoa(password)
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/auth`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    email: email,
                    password :senhaCriptografada,           
                }
            })
            .then(function (response) {
                if(response.status !== 200 ){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Usuário/senha incorreta',
                        type: 'error'
                    })
                }else{
                    return response.data
                }
            })
            .then(usuario=>{
                if(usuario === "" || usuario === undefined  ){
                    history.push('/')
                    usuario = ""
                    Swal.fire({
                        title: 'Error!',
                        text: 'Usuário/senha incorreta',
                        type: 'error'
                    })                
                }else{                              
                    var name = usuario.name.split(" ")
                    sessionStorage.setItem('currentUser', usuario.email);
                    sessionStorage.setItem('nameUser', name[0]); 
                    sessionStorage.setItem('IDUser', usuario.id); 
                    sessionStorage.setItem('groupAccess', usuario.groupAccess); 

                    history.push('/home')
                }
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Error!',
                    text: 'Usuário/senha incorreta',
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})
            })
        }
    }

    static sendEmail(email){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/sendEmail/${email}`,
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .then(function (response) {
                if(response.status !== 200 ){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Erro ao enviar o email',
                        type: 'error'
                    })
                }else{
                    return response.data
    
                }
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Error!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})


            })
        }
    }

    static getEmployeeByAny(request){

        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/employee/search`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    name: request.employee_name.value,
                    email: request.employee_email.value,
                    jobTitle: request.employee_job.value,
                    employeeNumber: parseInt(request.employee_number.value),
                }    
                
            })
            .then(function (response) {
                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listemployees=>{
                if(listemployees === [] || listemployees === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum colaborador encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"EMPLOYEES",listemployees})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static getAllEmployees(){

        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/employee`,
                headers:{
                    "Content-Type":"application/json",
                },                
            })
            .then(function (response) {
                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listemployees=>{
                if(listemployees === [] || listemployees === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum colaborador encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"EMPLOYEES",listemployees})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca de empregados!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static createEmployee(request){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/employee`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    firstName: request.first_name,
                    lastName: request.last_name,
                    name: request.name,
                    email: request.email,
                    jobTitle: request.job_title,
                    department: request.department,
                    employeeNumber: parseInt(request.employee_number),
                    idWorkplace: request.id_workplace,
                    accountClaimTime: moment(request.account_claim_time),
                    welcome: parseInt(request.welcome)
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro ao cadastrar!',
                        text: 'Verifique as informações do colaborador',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Colaborador cadastrado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao enviar as informações!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static removeEmployee(id, props){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'delete',
                url: `http://${server}/employee/${id}`,
                headers:{
                    "Content-Type":"application/json",
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao excluir o colaborador',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Colaborador excluído com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllEmployee()
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro na exclusão d o colaborador!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static updateEmployee(request, props){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'put',
                url: `http://${server}/employee`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    id: request.id,
                    firstName: request.first_name,
                    lastName: request.last_name,
                    name: request.name,
                    email: request.email,
                    jobTitle: request.job_title,
                    department: request.department,
                    employeeNumber: parseInt(request.employee_number),
                    idWorkplace: request.id_workplace,
                    accountClaimTime: moment(request.account_claim_time),
                    welcome: parseInt(request.welcome)
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro ao cadastrar!',
                        text: 'Verifique as informações do colaborador',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Colaborador alterado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllEmployee()
    
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao enviar as informações!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static createUser(request){
        var senhaCriptografada = btoa(request.password)

        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/user`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    name: request.name,
                    email: request.email,
                    password: senhaCriptografada,
                    groupAccess: request.groupAccess,
                    active: parseInt(request.active)
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro ao cadastrar!',
                        text: 'Verifique as informações do usuário',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário cadastrado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }
            })
            .catch((error)=>{
                console.log(error)
                Swal.fire({
                    title: 'Erro ao enviar as informações!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 
    
    static getUserByAny(request){
        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/user/search`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    name: request.user_name,
                    email: request.user_email,
                    groupAccess: request.user_group
                }    
                
            })
            .then(function (response) {
                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listusers=>{
                if(listusers === [] || listusers === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum usuário encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"USERS",listusers})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }    
    }

    static getAllUsers(){

        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/user`,
                headers:{
                    "Content-Type":"application/json",
                },                
            })
            .then(function (response) {
                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listusers=>{
                if(listusers === [] || listusers === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum usuário encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"USERS",listusers})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca de usuários!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static removeUser(id, props){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'delete',
                url: `http://${server}/user/${id}`,
                headers:{
                    "Content-Type":"application/json",
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao excluir o usuário',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário excluído com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllUsers()
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro na exclusão do usuário!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static updateUser(request, props){
        var senhaCriptografada = btoa(request.password)

        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'put',
                url: `http://${server}/user`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    id: request.id,
                    name: request.name,
                    email: request.email,
                    groupAccess: request.groupAccess,
                    password: senhaCriptografada,
                    active: parseInt(request.active) < 0?0:parseInt(request.active)
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro ao cadastrar!',
                        text: 'Verifique as informações do usuário',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário alterado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllUsers()
    
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao enviar as informações!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static getBots(request){
        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/integration/search`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    id: parseInt(request.id_bot.value),
                    name: request.name_bot.value,
                }    
                
            })
            .then(function (response) {                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listbots=>{
                if(listbots === [] || listbots === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum bot encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"LISTBOTS",listbots})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static getAllBots(){
        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/integration`,
                headers:{
                    "Content-Type":"application/json",
                }                
            })
            .then(function (response) {                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca de integrações',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listbots=>{
                if(listbots === [] || listbots === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhum bot encontrado',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"LISTBOTS",listbots})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static createBot(request){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/integration`,
                headers:{
                    "Content-Type":"application/json",
                },
                data:{
                    name: request.bot_name,
                    description: request.description,
                    token: request.token,
                    secret: request.secret,
                    verify: request.verify,
                    active: parseInt(request.active)
                }                
            })
            .then(function (response) { 
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao cadastrar o bot',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})

                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Bot cadastrado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao cadastrar o bot',
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static removeBot(id, props){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'delete',
                url: `http://${server}/integration/${id}`,
                headers:{
                    "Content-Type":"application/json",
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao excluir o bot',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Bot excluído com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllBots()
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro na exclusão do bot!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    } 

    static updateBot(request, props){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'put',
                url: `http://${server}/integration`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    id: request.id,
                    name: request.name,
                    token: request.token,
                    description: request.description,
                    secret: request.secret,
                    verify: request.verify,
                    active: parseInt(request.active)
                }            
            })
            .then(function (response) {
                if(!response || response.status === 500){
                    Swal.fire({
                        title: 'Erro ao alterar o cadastro!',
                        text: 'Verifique as informações do bot',
                        type: 'error'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
    
                }else{
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Bot alterado com sucesso',
                        type: 'success'
                    })
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    props.getAllBots()

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao enviar as informações!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static getAllGroups(){
        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/group?idIntegration=1`,
                headers:{
                    "Content-Type":"application/json",
                }                
            })
            .then(function (response) {
                if(!response || response.status !== 200)
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao buscar os grupos.',
                        type: 'warning'
                    });
                else{
                    return response.data.data
                }
            })
            .then(listgroups=>{
                if(listgroups === [] || listgroups === undefined ){
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Grupos não encontrados.',
                        type: 'error'
                    });
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})

                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"LISTGROUPS",listgroups})
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro!',
                    text: error,
                    type: 'warning'
                });;
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static sendMessage(request){
        if(request.sendTo === "1"){
            var email = []
            request.selectedOption.map((col)=>{
                email.push({email:col.value})
            })
                
            var url = `http://${server}/sendMessage`
            var body = {
                employees: email,
                message: request.message,
                idUserSend: parseInt(sessionStorage.getItem("IDUser")),
                idIntegration: parseInt(request.id_bot)
            } 
        }else{
             url = `http://${server}/sendGroupMessage`
             body = {
                idGroup:request.id_group,
                text: request.message,
                idUserSend: parseInt(sessionStorage.getItem("IDUser")),
                idIntegration: parseInt(request.id_bot)
            } 
        }

        return dispatch =>{
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: url,
                headers:{
                    "Content-Type":"application/json",
                },
                data: body              
            })
            .then(function (response) {
                if(!response || response.status !== 200){
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    console.log(response.data.error)
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Erro ao enviar a mensagem !',
                        type: 'error'
                    })
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Mensagem enviada com sucesso',
                        type: 'success'
                    })
                    return response.data.data
                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro!',
                    text: error.error,
                    type: 'warning'
                });
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }

    static getMessageByUser(user){
        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'get',
                url: `http://${server}/message/${user}/lastMessage`,
                headers:{
                    "Content-Type":"application/json",
                }                
            })
            .then(function (response) {                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca de mensagens',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(messagesUser=>{
                if(messagesUser === [] || messagesUser === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhuma mensagem encontrada',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"MESSAGESUSER",messagesUser})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }
    
    static getMessageByAny(request){
       
        return dispatch => {
            var isLoading = true  
            dispatch({type:"LOADING", isLoading})
            axios({
                method: 'post',
                url: `http://${server}/message/search`,
                headers:{
                    "Content-Type":"application/json",
                },
                data: {
                    id: parseInt(request.id_batch.value)?parseInt(request.id_batch.value):0,
                    idIntegration: parseInt(request.id_bot.value)?parseInt(request.id_bot.value):0,
                    idUserSend: parseInt(sessionStorage.getItem('IDUser'))
                }             
            })
            .then(function (response) {                
                if(!response || response.status === 500)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao efetuar a busca de mensagens',
                    type: 'error'
                });
                else{
                    return response.data
                }
            })
            .then(listmessages=>{
                if(listmessages === [] || listmessages === undefined){
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Nenhuma mensagem encontrada',
                        type: 'info'
                    });
                }else{
                    isLoading = false  
                    dispatch({type:"LOADING", isLoading})
                    dispatch({type:"LISTMESSAGES",listmessages})

                }
            })
            .catch((error)=>{
                Swal.fire({
                    title: 'Erro ao efetuar a busca!',
                    text: error,
                    type: 'error'
                })
                isLoading = false  
                dispatch({type:"LOADING", isLoading})

            })
        }
    }
}