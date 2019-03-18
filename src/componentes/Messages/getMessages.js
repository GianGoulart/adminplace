import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import TableMessagesContainer from './tableMessage';


class GetMessage extends Component {
    constructor(props)
    {
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
                                <strong>Consultar Mensagens  <i className="fa fa-comments"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="3">
                                        <FormGroup>
                                            <Label htmlFor="id_batch"><strong>Id Lote:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-tasks"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md"  name="id_batch" id="id_batch" ref={(input) => this.id_batch = input} placeholder="Id do lote" />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="3">
                                        <FormGroup>
                                            <Label htmlFor="id_bot"><strong>Por Bot:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-cubes"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="id_bot" id="id_bot" ref={(input) => this.id_bot = input} placeholder="Id do bot" />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary" onClick = { ev=> this.props.getMessageByAny(ev, this) }><i className="icon-magnifier"></i> Pesquisar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.props.store.listmessages&&
                    <TableMessagesContainer/>                                    
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
        getMessageByAny(ev, request){
            ev.preventDefault();
            dispatch(Store.getMessageByAny(request))
        }   
    }
}

GetMessage.contextTypes = {
    store: PropTypes.object.isRequired
}

const GetMessageContainer = connect(mapStateToProps, mapDispatchToProps)(GetMessage);

export default GetMessageContainer