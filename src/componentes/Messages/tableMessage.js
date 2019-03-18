import React, { Component } from 'react';
import { Button,Modal, ModalBody, ModalHeader, ModalFooter,Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Store from '../../store/storage';
import moment from 'moment';


class TableMessages extends Component {

    constructor(props){
        super(props)
        this.state = {
            listmessages:this.props.store.listmessages,
            currentPage:1,
            prevPage:1,
            nextPage: 2,
            msgsPerPage:10,
            modal: {},
            id:0             
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleClick(event) {
        this.setState({
            prevPage: (Number(event.target.id) - 1 <= 0)?0:Number(event.target.id) - 1,
            currentPage: (Number(event.target.id) === 0)?1:Number(event.target.id),
            nextPage:Number(event.target.id) +1 
        });
    }
    toggle(event) {
        this.state.id = (event.target.id)? event.target.id : this.state.id  
        this.setState(
            Object.assign(
                this.state.modal,
                {[this.state.id]:!this.state.modal[this.state.id]}
            )
        );
    }

    render() {
        const {  currentPage, msgsPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * msgsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - msgsPerPage;
        const currentMsgs = this.props.store.listmessages.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderMsgs = currentMsgs.map((msg, index) => {
            return  (<tr key={index}> 
                        <td>{msg.id}</td>
                        <td>
                            <Button color="warning" id={msg.id} onClick={this.toggle}>Ver Texto</Button>
                            <Modal isOpen={this.state.modal[msg.id]} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Texto da Mensagem {msg.id} <i className="fa fa-keyboard-o"></i></ModalHeader>
                                <ModalBody>
                                    {msg.text}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={this.toggle}>Fechar</Button>
                                </ModalFooter>
                            </Modal>
                        </td>
                        <td>{moment(msg.sendTime).format("DD/MM/YYYY")}</td>
                        <td>{msg.idIntegration}</td>                      
                    </tr>)
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.store.listmessages.length / msgsPerPage); i++) {
            pageNumbers.push(i);
        }

        const RenderPageNumbers = ()=>{                  
            return(
                <Pagination>
                    {this.state.prevPage > 1 &&
                     <PaginationItem >
                            <PaginationLink key={1} id={1} onClick={this.handleClick} tag="button"><span><i className="fa fa-angle-double-left"></i></span>  </PaginationLink>
                    </PaginationItem> }
                    {this.state.prevPage !== currentPage && this.state.prevPage > 0&&
                    <PaginationItem >
                            <PaginationLink key={this.state.prevPage} id={this.state.prevPage} onClick={this.handleClick} tag="button">{this.state.prevPage}</PaginationLink>
                    </PaginationItem>     }                     
                    <PaginationItem active>
                        <PaginationLink key={currentPage} id={currentPage} onClick={this.handleClick} tag="button">{currentPage}</PaginationLink>
                    </PaginationItem>
                    {this.state.nextPage !== currentPage && pageNumbers.length > 1 && this.state.nextPage <= pageNumbers.length &&
                    <PaginationItem >
                        <PaginationLink key={this.state.nextPage} id={this.state.nextPage} onClick={this.handleClick} tag="button">{this.state.nextPage}</PaginationLink>
                    </PaginationItem>}
                    {this.state.nextPage < pageNumbers.length&&
                    <PaginationItem >
                            <PaginationLink key={pageNumbers.length} id={pageNumbers.length} onClick={this.handleClick} tag="button"><span><i className="fa fa-angle-double-right"></i></span></PaginationLink>
                    </PaginationItem> }
                </Pagination>
            )
        }
        return (
            <div className="animated fadeIn"> 
                <Row>
                <Col>
                    <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Lista de Mensagens
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Lote</th>
                                    <th>Texto</th>
                                    <th>Data do envio</th>
                                    <th>Id Bot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderMsgs}
                            </tbody>
                        </Table>
                        {this.props.store.listmessages.length > 0 &&
                        <RenderPageNumbers/>}
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>

        );
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
    }
}

TableMessages.contextTypes = {
    store: PropTypes.object.isRequired
}

const TableMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(TableMessages);

export default TableMessagesContainer;
