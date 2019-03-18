import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from '../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import TableGroupContainer from './tableGroup';

class RemoveMemberGroup extends Component {
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
                                <strong>Consultar Grupos  <i className="fa fa-users"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="9">
                                        <FormGroup>
                                            <Label htmlFor="name_group"><strong>Nome do Grupo:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-cube"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>                                           
                                                <input type="text" placeholder="Nome do grupo" id="name_group" autoComplete="name_group" name="name_group"  className="form-control"
                                                ref={input => this.name_group = input} required/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary" onClick={ev=>this.props.getGroups(ev,this.id_group, this.name_group)}><i className="fa icon-magnifier"></i> Pesquisar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.props.store.listgroups&&
                    <TableGroupContainer/>                                    
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
        getGroups(ev, id_group, name_group){
            ev.preventDefault();
            dispatch(Store.getGroups(id_group.value,name_group.value));
        }
        
    }
}

RemoveMemberGroup.contextTypes = {
    store: PropTypes.object.isRequired
}

const RemoveMemberGroupContainer = connect(mapStateToProps, mapDispatchToProps)(RemoveMemberGroup);

export default RemoveMemberGroupContainer