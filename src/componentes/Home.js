import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Col,Row}  from 'reactstrap';
import DefaultLayout from './../containers/DefaultLayout/DefaultLayout';
import Store from '../store/storage';
import ChartHomeContainer from './ChartHome'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            botActive : 0,
            botInactive : 0,
            groupActive: 0,
            groupInactive: 0,
            centBotActive:0,
            centBotInactive:0,
            centGroupActive:0,
            centGroupInactive:0,
            data : [{name: 'Última mensagem enviada', enviada: 0, recebida: 0, lida: 0,}]      
          
        }
        this.props.store.loader = false
        this.botActiveInactive = this.botActiveInactive.bind(this) 
        this.groupActiveInactive = this.groupActiveInactive.bind(this) 
    }
    
    componentWillMount(){
        this.props.getMessageByUser(parseInt(sessionStorage.getItem('IDUser')))
        this.props.getAllGroups()
        this.props.getAllBots()
        this.user = sessionStorage.getItem('currentUser') 
        this.name = sessionStorage.getItem('nameUser') 
        this.idUser = sessionStorage.getItem('IDUser') 
        this.groupAccess = sessionStorage.getItem('groupAccess') 

    }

    botActiveInactive(){
        var active = 0 
        var inactive = 0
        this.props.store.listbots.forEach(bot => {
            if(bot.active === 1){
                active = active + 1;
            }else{
                inactive = inactive+1
            }
        });
        var centBotActive = Math.round(((active * 100)/this.props.store.listbots.length))
        this.setState({
            botActive : active,
            botInactive : inactive,
            centBotActive: centBotActive,
            centBotInactive: (100 - centBotActive)

        })
    }

    groupActiveInactive(){
        var active = 0 
        var inactive = 0
        this.props.store.listgroups.forEach(group => {
            if(group.privacy === "CLOSED"){
                inactive = inactive+1                
            }else{
                active = active + 1;            }
        });
        var centGroupActive = Math.round(((active * 100)/this.props.store.listgroups.length))

        this.setState({
            groupActive : active,
            groupInactive : inactive,
            centGroupActive: centGroupActive,
            centGroupInactive: (100-centGroupActive)
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.store.listgroups !== this.props.store.listgroups) {
            this.groupActiveInactive()
        }
        if (prevProps.store.listbots !== this.props.store.listbots){
            this.botActiveInactive()
        }
        
    }
    


    renderizarComponente() {      
        return (          
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-aqua">
                            <span class="info-box-icon"><i class="fa fa-group"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Total de grupos</span>
                            <span class="info-box-number">{this.props.store.listgroups.length}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: '100%'}}></div>
                            </div>
                            <span class="progress-description">
                                    Total de grupos cadastrados
                            </span>
                            </div>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-success">
                            <span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Grupos Ativos</span>
                            <span class="info-box-number">{this.state.groupActive}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: this.state.centGroupActive + '%'}}></div>
                            </div>
                            <span class="progress-description">
                                    {this.state.centGroupActive}% dos grupos cadastrados
                            </span>
                            </div>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-danger">
                            <span class="info-box-icon"><i class="fa fa-user-times"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Grupos Inativos</span>
                            <span class="info-box-number">{this.state.groupInactive}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: this.state.centGroupInactive +'%'}}></div>
                            </div>
                            <span class="progress-description">
                                    {this.state.centGroupInactive}% dos grupos cadastrados
                            </span>
                            </div>
                        </div>
                     </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-aqua">
                            <span class="info-box-icon"><i class="fa fa-cubes"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Total de bots</span>
                            <span class="info-box-number">{this.props.store.listbots.length}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: '100%'}}></div>
                            </div>
                            <span class="progress-description">
                                    Total de bots cadastrados
                            </span>
                            </div>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-success">
                            <span class="info-box-icon"><i class="fa fa-comment-o"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Bots Ativos</span>
                            <span class="info-box-number">{this.state.botActive}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: this.state.centBotActive +'%'}}></div>
                            </div>
                            <span class="progress-description">
                                    {this.state.centBotActive }% dos bots cadastrados
                            </span>
                            </div>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" lg="4">
                        <div class="info-box bg-danger">
                            <span class="info-box-icon"><i class="fa fa-ban"></i></span>

                            <div class="info-box-content">
                            <span class="info-box-text">Bots Inativos</span>
                            <span class="info-box-number">{this.state.botInactive}</span>

                            <div class="progress">
                                <div class="progress-bar" style={{width: this.state.centBotInactive +'%'}}></div>
                            </div>
                            <span class="progress-description">
                                    {this.state.centBotInactive}% dos grupos cadastrados
                            </span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                {Object.keys(this.props.store.messagesUser).length > 0 &&
                    <ChartHomeContainer />
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
        getAllGroups(){
            dispatch(Store.getAllGroups())
        },
        getAllBots(){
            dispatch(Store.getAllBots())
        },
        getMessageByUser(idUser){
            dispatch(Store.getMessageByUser(idUser))
        }
    }
}

Home.contextTypes = {
    store: PropTypes.object.isRequired
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer