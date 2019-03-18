import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import validaCampos from './../../utils/validaCampo'

class CreateEmployee extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            first_name:"",
            last_name:"",
            email:"",
            job_title:"",
            department:"",
            employee_number:"",
            id_workplace:"",
            account_claim_time:"",
            welcome:"",
        }
        this.props.store.loader = false
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] :  e.target.value
        })        
    }

    componentWillMount() {
        this.user = sessionStorage.getItem('currentUser') 
        this.name = sessionStorage.getItem('nameUser') 
        this.idUser = sessionStorage.getItem('IDUser') 
        this.groupAccess = sessionStorage.getItem('groupAccess') 
    }
  
    renderizarComponente() {
        return (          
            <div className="animated fadeIn"> 
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>Inserir Colaboradores  <i className="fa fa-users"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="name">Nome Completo:</Label>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <input type="text" className="form-control form-control-md" value={this.state.name} name="name" id="name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o nome do colaborador"  required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="first_name">Primeiro Nome:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-font"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.first_name} name="first_name" id="first_name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o primeiro nome"  required />
                                            </InputGroup>    
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6" >
                                        <FormGroup>
                                            <Label htmlFor="last_name">Último Nome:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-font"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.last_name} name="last_name" id="last_name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o ultimo nome" required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
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
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="job_title">Cargo:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-card-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.job_title} name="job_title" id="job_title" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o cargo do colaborador"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="department">Departamento:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-card-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.department} name="department" id="department" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o departamento do colaborador"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="employee_number">ID Colaborador</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-badge"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.employee_number} name="employee_number" id="employee_number" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o departamento do id do colaborador"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="id_workplace">ID Workplace</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-badge"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" value={this.state.id_workplace} name="id_workplace" id="id_workplace" onChange = {(e)=>this.handleChange(e)} placeholder="Somente se souber"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="account_claim_time">Inicio de Empresa</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-calendar"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="date" className="form-control form-control-md" value={this.state.account_claim_time} name="account_claim_time" id="account_claim_time" onChange = {(e)=>this.handleChange(e)} placeholder="Insira a data de admissão"  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>                                            
                                            <Label htmlFor="welcome">Boas Vindas?:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-child"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <select className="form-control form-control-md" type="select" value={this.state.welcome} name="welcome" id="welcome" onChange = {(e)=>this.handleChange(e)} required>
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
                                <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.createEmployee(this.state, event)} ><i className="fa fa-plus"></i> Criar</Button>
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
        createEmployee(request, ev){
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
                dispatch(Store.createEmployee(request))
            }
        }
    }
}

CreateEmployee.contextTypes = {
    store: PropTypes.object.isRequired
}

const CreateEmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);

export default CreateEmployeeContainer