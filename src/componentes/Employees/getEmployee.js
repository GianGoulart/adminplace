import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import TableEmployeeContainer from './tableEmployees';

class GetEmployee extends Component {
    constructor(props){
        super(props);
        this.props.store.loader = false
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
                                <strong>Consultar Colaboradores  <i className="fa fa-users"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="6" md="3">
                                        <FormGroup>
                                            <Label htmlFor="employee_number"><strong>Id Colaborador:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-badge"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="employee_number" id="employee_number" placeholder="Id do colaborador" ref={(input) => this.employee_number = input}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <FormGroup>
                                            <Label htmlFor="employee_name"><strong>Nome Colaborador:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-user"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="employee_name" id="employee_name" placeholder="Nome do colaborador" ref={(input) => this.employee_name = input} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="employee_email"><strong>Email:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-at"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="employee_email" id="employee_email" placeholder="Email do colaborador" ref={(input) => this.employee_email = input}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="employee_job"><strong>Cargo:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-id-card-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="employee_job" id="employee_job" placeholder="Cargo do colaborador" ref={(input) => this.employee_job = input} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary" onClick={event=>this.props.getEmployee(this, event)}><i className="fa icon-magnifier"></i> Pesquisar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.props.store.listemployees &&
                    <TableEmployeeContainer />                                    
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
        getEmployee(request){
            dispatch(Store.getEmployeeByAny(request));
        }
    }
}

GetEmployee.contextTypes = {
    store: PropTypes.object.isRequired
}

const GetEmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(GetEmployee);

export default GetEmployeeContainer