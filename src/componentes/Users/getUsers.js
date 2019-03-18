import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import TableUserContainer from './tableUsers';

class GetUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_email:"",
            user_name:"",
            user_group:"",
        }
        this.props.store.loader = false
    }

    componentWillMount() {
        this.user = sessionStorage.getItem('currentUser') 
        this.name = sessionStorage.getItem('nameUser') 
        this.idUser = sessionStorage.getItem('IDUser') 
        this.groupAccess = sessionStorage.getItem('groupAccess') 
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    renderizarComponente() {
        return (          
            <div className="animated fadeIn">        
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>Consultar Usuários  <i className="fa fa-users"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="9">
                                        <FormGroup>
                                            <Label htmlFor="user_name"><strong>Nome Usuário:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-user"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="user_name" id="user_name" placeholder="Nome do usuário" onChange = {(e)=>this.handleChange(e)} value={this.state.user_name} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="user_email"><strong>Email:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-at"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="email" className="form-control form-control-md" name="user_email" id="user_email" placeholder="Email do usuário" onChange = {(e)=>this.handleChange(e)}  value={this.state.user_email}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <FormGroup>
                                            <Label htmlFor="user_groupAccess"><strong>Grupo de Acesso:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-bagde-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <select className="form-control form-control-md" type="select" value={this.state.user_group} name="user_group" id="user_group" onChange = {(e)=>this.handleChange(e)} required>
                                                    <option value="0">Selecione...</option>
                                                    <option value="adm">Adm</option>
                                                    <option value="user">Usuário</option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary" onClick={event=>this.props.getUser(this.state, event)}><i className="fa icon-magnifier"></i> Pesquisar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.props.store.listusers &&
                    <TableUserContainer />                                    
                }
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
        getUser(request){
            dispatch(Store.getUserByAny(request));
        }
    }
}

GetUser.contextTypes = {
    store: PropTypes.object.isRequired
}

const GetUserContainer = connect(mapStateToProps, mapDispatchToProps)(GetUser);

export default GetUserContainer