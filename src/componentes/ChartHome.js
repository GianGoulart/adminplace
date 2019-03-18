import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Col,Row}  from 'reactstrap';
import Store from '../store/storage';
import {  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer} from 'recharts'

class ChartHome extends Component {   
    constructor(props){
        super(props)
    }

    render() {
        if(Object.keys(this.props.store.messagesUser).length > 0){   
            const data = [{
                name: 'Última mensagem enviada',
                enviada: this.props.store.messagesUser.sends, 
                recebida: this.props.store.messagesUser.receives, 
                lida: this.props.store.messagesUser.readsMsgs,
            }]
            return (          
                <Row className="chart">
                    <Col className="chart">
                        <div className="box box-info chartHome">
                            <div className="box-header with-border">
                                <h3 className="box-title">Gráfico última mensagem enviada <span><i className="fa fa-line-chart"></i></span></h3>
                            </div>
                            <ResponsiveContainer>                     
                                <BarChart data={data}
                                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="enviada" fill="#4d6ade" />
                                    <Bar dataKey="recebida" fill="#f0b629" />
                                    <Bar dataKey="lida" fill="#25c10d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>
            )
        }else{
            return null
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
        getMessageByUser(idUser){
            dispatch(Store.getMessageByUser(idUser))
        }
   }
}

ChartHome.contextTypes = {
    store: PropTypes.object.isRequired
}

const ChartHomeContainer = connect(mapStateToProps, mapDispatchToProps)(ChartHome);

export default ChartHomeContainer