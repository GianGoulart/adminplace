import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import validaCampos from './../../utils/validaCampo'

class CreateBot extends Component {
    constructor(props){
        super(props);
        this.state = {
            bot_name:"",
            token:"",
            description:"",
            secret:"",
            verify:"",
            active:"",
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
                                <strong>Inserir Integrações  <i className="fa fa-cubes"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="8">
                                        <FormGroup>
                                            <Label htmlFor="bot_name">Nome Integração:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-cube"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="bot_name" id="bot_name" placeholder="Insira o nome da integração" onChange = {(e)=>this.handleChange(e)}  required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>                                   
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="token">Token:</Label>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-key"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <input type="text" className="form-control form-control-md" name="token" id="token" placeholder="Insira o seu token Workplace" onChange = {(e)=>this.handleChange(e)} required/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="description">Descrição:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-keyboard-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="description" id="description" placeholder="Insira a descrição da integração" onChange = {(e)=>this.handleChange(e)} required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="secret">Secret:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-user-secret"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="secret" id="secret" placeholder="Insira a secret Workplace" onChange = {(e)=>this.handleChange(e)}  required/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="verify">Verify:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-eye"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="verify" id="verify" placeholder="Insira a verify Workplace" onChange = {(e)=>this.handleChange(e)}  required/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="active">Integração ativa?</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-check-square"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <Col xs="12" md="9">
                                                    <select className="form-control form-control-md" type="select" name="active" id="active" onChange = {(e)=>this.handleChange(e)}  required>
                                                        <option value="0">Selecione...</option>
                                                        <option value={1}>Sim</option>
                                                        <option value={2}>Não</option>
                                                    </select>
                                                </Col>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.createBot(this.state, event)} ><i className="fa fa-plus"></i> Criar</Button>
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
        createBot(request, ev){
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
                dispatch(Store.createBot(request))
            }
            
        }
    }
}

CreateBot.contextTypes = {
    store: PropTypes.object.isRequired
}

const CreateBotContainer = connect(mapStateToProps, mapDispatchToProps)(CreateBot);

export default CreateBotContainer