import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import validaCampos from './../../utils/validaCampo'

class CreateUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            password:"",
            groupAccess:"",
            active:"1",
        }
        this.props.store.loader = false
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        this.user = sessionStorage.getItem('currentUser') 
        this.name = sessionStorage.getItem('nameUser') 
        this.idUser = sessionStorage.getItem('IDUser') 
        this.groupAccess = sessionStorage.getItem('groupAccess') 
    }
  
    handleChange = (e) =>{
        this.setState({
            [e.target.name] :  e.target.value
        })        
    }

  
    renderizarComponente() {
        return (          
            <div className="animated fadeIn"> 
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>Registrar Usuário <i className="fa fa-user-plus"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="name">Nome Completo:</Label>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-user"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <input type="text" className="form-control form-control-md" value={this.state.name} name="name" id="name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o nome do colaborador"  required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col md="6" xs="12">
                                        <FormGroup>                                    
                                            <Label htmlFor="email">Email:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-at"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="email" className="form-control form-control-md" value={this.state.email} name="email" id="email" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o email do colaborador" required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="department">Grupo:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-users"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <select className="form-control form-control-md" type="select" value={this.state.groupAccess} name="groupAccess" id="groupAccess" onChange = {(e)=>this.handleChange(e)} required>
                                                    <option value="0">Selecione...</option>
                                                    <option value="adm">Adm</option>
                                                    <option value="user">Usuário</option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col md="6" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="job_title">Password:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-key"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="password" className="form-control form-control-md" value={this.state.password} name="password" id="password" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o cargo do colaborador"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6" xs="12">
                                        <FormGroup>                                            
                                            <Label htmlFor="welcome">Ativo?:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-check"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <select className="form-control form-control-md" type="select" value={this.state.active} name="active" id="active" onChange = {(e)=>this.handleChange(e)} required>
                                                    <option value="0">Selecione...</option>
                                                    <option value="1">Sim</option>
                                                    <option value="-1">Não</option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>                                  
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.createUser(this.state, event)} ><i className="fa fa-plus"></i> Criar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
   
    render() {
        if(this.user === undefined || this.user === "" || this.user === null ){
            this.props.history.push('/');
            return null
        }else{
            return (
                <DefaultLayout {...this.props} renderizarComponente = {this.renderizarComponente.bind(this)}/>
            );
        }
    }
}

const mapStateToProps = state => {
    return { store: state }
};

const mapDispatchToProps = dispatch => {
    return {
        reload() {
            dispatch(Store.reload({isReload: true}));
        },        
        createUser(request, ev){
            ev.preventDefault();
            var error = validaCampos(request)
            if (error.error){
                error.elementInvalid.forEach(elem =>{
                    var element = document.getElementById(elem)
                    element.classList.add("is-invalid")                            
                })
                error.elementValid.forEach(elem =>{
                    var element = document.getElementById(elem)
                    element.classList.remove("is-invalid")                            
                })
                Swal.fire({
                    title: 'Erro ao cadastrar!',
                    text: error.msgError,
                    type: 'error'
                }) 
            }else{
                dispatch(Store.createUser(request))
            }
        }
    }
}

CreateUsers.contextTypes = {
    store: PropTypes.object.isRequired
}

const CreateUsersContainer = connect(mapStateToProps, mapDispatchToProps)(CreateUsers);

export default CreateUsersContainer