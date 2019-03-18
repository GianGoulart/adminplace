import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,Row, InputGroup, InputGroupAddon, InputGroupText,CustomInput } from 'reactstrap';
import DefaultLayout from './../../containers/DefaultLayout/DefaultLayout';
import Store from '../../store/storage';
import Select from 'react-select';

class SendMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            sendTo : '0',
            options:[],
            selectedOption: null,
            id_group: '',
            id_bot: '',
            message: '',
            autoSend: false,
            whenSend: '',
            cron:'',
            howSend:''
        }
        this.props.store.loader = false
    }

    componentWillMount(){
        this.props.getAllBots()
        this.props.getAllEmployees()
        this.props.getGroups()
        this.user = sessionStorage.getItem('currentUser') 
        this.name = sessionStorage.getItem('nameUser') 
        this.idUser = sessionStorage.getItem('IDUser') 
        this.groupAccess = sessionStorage.getItem('groupAccess') 
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] :  e.target.value
        })        
    }

    multiSelectEmployee(){
        this.props.store.listemployees.map(emp=>{
            this.state.options.push({value: emp.email, label:emp.email})
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.store.listemployees !== this.props.store.listemployees) {
            this.multiSelectEmployee()
        }
    }
    renderizarComponente() {
        return (          
            <div className="animated fadeIn">               
                <Row className="flex-container">
                    <Col style={{flexGrow:1}}>
                        <Card>
                            <CardHeader>
                                <strong>Enviar Mensagem  <i className="fa fa-comments"></i></strong>
                            </CardHeader>
                            <CardBody>                                
                                <FormGroup row className="my-0">                                    
                                    <Col xs="6" md="4">
                                        <Label htmlFor="sendTo">Enviar para:</Label>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-reply-all"></i>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <select className="form-control form-control-md icon-margin" name="sendTo" id="sendTo"  onChange={event => this.onChange(event)} 
                                            valeu={this.state.sendTo} >
                                                <option value="0" key="0">Selecione...</option>
                                                <option value="1" key="1">Colaboradores</option>
                                                <option value="2" key="2">Grupo</option>
                                            </select>
                                        </InputGroup>
                                    </Col>
                                    {this.state.sendTo === "1" &&
                                        <Col xs="6" md="6">
                                            <Label htmlFor="listemployees">Lista de Colaboradores:</Label>     
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-user"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>                                   
                                            <Select
                                                className="form-control form-control-md"
                                                value={this.state.selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.options}
                                                isMulti
                                                closeMenuOnSelect = {false}
                                            />
                                            </InputGroup>
                                        </Col>
                                    }
                                    {this.state.sendTo === "2" &&                                    
                                        <Col xs="6" md="6">
                                            <Label htmlFor="">Lista de Grupos:</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-users"></i>
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <select className="form-control form-control-md" name="id_group" id="id_group" value={this.state.id_group}  onChange={event => this.onChange(event)}>
                                                    <option value="0">Selecione...</option>
                                                    {this.props.store.listgroups.map(group=>(
                                                            <option value={group.id} key={group.id}>{group.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </InputGroup>
                                        </Col>
                                    }
                                </FormGroup>
                                <br/>
                                <FormGroup row className="my-0">
                                    <Col xs="6" md="4">
                                        <Label htmlFor="bot">Escolha o bot:</Label>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-cube"></i>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <select className="form-control form-control-md" name="id_bot" id="id_bot" value={this.state.id_bot} onChange={event => this.onChange(event)}>
                                                <option value="0">Selecione...</option>
                                                {this.props.store.listbots.map(bot=>(
                                                        <option value={bot.id} key={bot.id}>{bot.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </InputGroup>
                                    </Col>

                                </FormGroup>
                                <br/>
                                <FormGroup row className="my-0">
                                    <Col xs="12" md="6">
                                        <Label htmlFor="message">Mensagem:</Label>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-keyboard-o"></i>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <textarea className="form-control form-control-md" name="message" id="message" value={this.state.message} onChange={event => this.onChange(event)} placeholder="Insira a mensagem a ser enviada" />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.sendMessage(this.state,event)} ><i className="fa fa-send"></i> Enviar</Button>
                                <Button type="button" size="md" className="float-right" color="success" onClick={event=>this.setState({autoSend:this.state.autoSend?false:true})}><i className="fa fa-gears"></i> Configurar envio automático</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    {this.state.autoSend &&
                        <Col className="animated fadeIn">
                            <Card>
                                <CardHeader><strong>Configurações de envio <i className="fa fa-gears"></i></strong></CardHeader>
                                <CardBody>
                                    <div>
                                        <Label for="whenSend"><strong>Enviar por ?</strong></Label>
                                            <Row style={{marginLeft:"1%"}}>
                                                <CustomInput type="radio" id="actions" name="howSend" value="actions" onChange={event => this.onChange(event)} label="Ações" />
                                                <CustomInput type="radio" id="schedules" name="howSend" value="schedules" onChange={event => this.onChange(event)} label="Agendamentos" />
                                            </Row>
                                            <br/>
                                            {this.state.howSend === "actions"&&
                                                <FormGroup style={{marginRight:"3%"}} >
                                                    <Label for="actions"><strong>Açõe</strong></Label>
                                                    <div>
                                                        <CustomInput type="radio" id="login" name="whenSend" value="login" onChange={event => this.onChange(event)} label="Ao efetuar o login" />
                                                        <CustomInput type="radio" id="logout" name="whenSend" value="logout" onChange={event => this.onChange(event)} label="Ao efetuar o logout " />
                                                    </div>
                                                </FormGroup>
                                            }
                                            {this.state.howSend === "schedules" &&
                                                <FormGroup>
                                                    <Label for="cron"><strong>Agendar</strong></Label>
                                                    <div>
                                                        <CustomInput type="radio" id="everyDay" name="whenSend" value="everyDay" onChange={event => this.onChange(event)} label="Todos os dias " />
                                                        <CustomInput type="radio" id="dayOfweek" name="whenSend" value="dayOfWeek" onChange={event => this.onChange(event)} label="Dias da semana"/>
                                                    </div>                                                    
                                                </FormGroup>
                                            }
                                        {this.state.whenSend === "dayOfWeek"&&
                                            <div>
                                                <Label for="cron"><strong>Selecione os dias:</strong></Label>
                                                <FormGroup check >
                                                    <input type="checkbox" name="dom" id="dom" />
                                                    <Label for="dom" check>Dom</Label>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="seg" id="seg"/>
                                                    <Label for="seg" check>Seg </Label>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="ter" id="ter"/>
                                                    <Label for="ter" check>Ter </Label>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="qua" id="qua"/>
                                                    <Label for="qua" check>Qua </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="qui" id="qui"/>
                                                    <Label for="qui" check>Qui </Label>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="sex" id="sex"/>
                                                    <Label for="sex" check>Sex </Label>
                                                    <input type="checkbox" style={{marginLeft:"2%"}} name="sab" id="sab"/>
                                                    <Label for="sab" check>Sab </Label>
                                                </FormGroup>
                                                <br/>
                                            </div>
                                            
                                        } 
                                        {this.state.howSend === 'schedules' && 
                                            <div>     
                                                <div>                                       
                                                        <FormGroup >
                                                            <Label for="cron"><strong>Periodicidade</strong></Label>
                                                            <div>
                                                                <CustomInput type="radio" id="onceTime" name="cron" value={"onceTime"} onChange={event => this.onChange(event)} label="Uma vez ao dia " />  
                                                                <CustomInput type="radio" id="everyHours" name="cron" value={"everyHours"} onChange={event => this.onChange(event)} label="Customizar " />                                           
                                                            </div>
                                                            <br />
                                                        </FormGroup>
                                                </div>
                                                <div>
                                                    {this.state.cron === 'onceTime' && 
                                                        <div>
                                                            <strong>Agendamento</strong>
                                                            <p>Enviar ás <input type="text" style={{width:"6%"}} name="sendTime" id="sendTime" />  horas</p>
                                                        </div>
                                                    }
                                                    {this.state.cron === 'everyHours' &&
                                                        <div>
                                                            <strong>Agendamento</strong>
                                                            <p>Intervalo de <input type="text" style={{width:"6%",alignSelf: "right"}} name="intervalo" id="intervalo" /> á partir das <input type="text" name="sendTime" id="sendTime" style={{width:"6%"}}/> horas</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </CardBody>    
                                <CardFooter>
                                    <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.sendMessage(this.state,event)} ><i className="fa fa-save"></i> Salvar</Button>
                                    <Button type="button" size="md" className="float-right" color="danger" onClick={event=>this.setState({autoSend:false})}><i className="fa fa-trash"></i> Cancelar</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    }
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
        getAllEmployees(){
            dispatch(Store.getAllEmployees());
        },
        getAllBots(){
            dispatch(Store.getAllBots());
        },
        getGroups(){
            dispatch(Store.getAllGroups());
        },
        reload() {
            dispatch(Store.reload({isReload: true}));
        },    
        sendMessage(req,ev){
            ev.preventDefault()
            dispatch(Store.sendMessage(req))
        }    
    }
}

SendMessage.contextTypes = {
    store: PropTypes.object.isRequired
}

const SendMessageContainer = connect(mapStateToProps, mapDispatchToProps)(SendMessage);

export default SendMessageContainer