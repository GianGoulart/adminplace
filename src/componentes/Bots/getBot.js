import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import TableBotsContainer from './tableBot';

class GetBot extends Component {
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
                                <strong>Consultar Integrações  <i className="fa fa-cubes"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="4">
                                        <FormGroup>
                                            <Label htmlFor="id_bot"><strong>Id Bot:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-cube"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>                       
                                                <input type="text" className="form-control form-control-md" name="id_bot" id="id_bot" placeholder="Id do bot" ref={(input)=> this.id_bot = input} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="name_bot"><strong>Nome Bot:</strong></Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-keyboard-o"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <input type="text" className="form-control form-control-md" name="name_bot" id="name_bot" placeholder="Nome do bot" ref={(input)=>this.name_bot = input} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" onClick={ev=>this.props.getBots(this, ev)} color="primary"><i className="fa icon-magnifier"></i> Pesquisar</Button>
                                <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.props.store.listbots.length > 0  &&
                    <TableBotsContainer/>                                    
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
        getBots(request, ev){
            ev.preventDefault()
            dispatch(Store.getBots(request));
        }
        
    }
}

GetBot.contextTypes = {
    store: PropTypes.object.isRequired
}

const GetBotContainer = connect(mapStateToProps, mapDispatchToProps)(GetBot);

export default GetBotContainer