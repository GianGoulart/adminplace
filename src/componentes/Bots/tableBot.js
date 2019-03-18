import React, { Component } from 'react';
import { Button,ButtonGroup, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Modal,  ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Store from '../../store/storage';
import UpdateBot from './updateBot'
import validaCampos from './../../utils/validaCampo'

class TableBots extends Component {

    constructor(props){
        super(props)
        this.state = {
            listbots:this.props.store.listbots,
            currentPage:1,
            prevPage:1,
            nextPage: 2,
            botsPerPage:10,
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
        const {  currentPage, botsPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * botsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - botsPerPage;
        const currentBots = this.props.store.listbots.slice(indexOfFirstTodo, indexOfLastTodo);
      
        const renderBots = currentBots.map((bot, index) => {
            return  (<tr key={index}>
                        <td>{bot.id}</td>
                        <td>{bot.name}</td>
                        <td>{bot.secret}</td>
                        <td>{bot.verify}</td>
                        <td>
                            <ButtonGroup size="sm">
                                <Button color="warning" id={bot.id} onClick={this.toggle}>Alterar</Button>
                                <Modal isOpen={this.state.modal[bot.id]} toggle={this.toggle} className={this.props.className}>
                                    <ModalBody>
                                        <UpdateBot {...this.props} bot= {bot}/>
                                    </ModalBody>
                                </Modal>
                                 <Button  type="submit" size="sm" color="danger"  onClick={event=>this.props.removeBot(bot.id, event, this.props)} >Remover</Button>
                            </ButtonGroup>
                        </td>
                    </tr>)
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.store.listbots.length / botsPerPage); i++) {
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
                        <i className="fa fa-align-justify"></i> Lista de Bots
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Secret</th>
                                    <th>Verify</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderBots}
                            </tbody>
                        </Table>
                        {this.props.store.listbots.length > 0 &&
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
        removeBot(id,event, props){
            event.preventDefault()
            dispatch(Store.removeBot(id,props));
        },    
        getAllBots(){
            dispatch(Store.getAllBots());
        },
        updateBot(request, ev, props){
            ev.preventDefault();
            var error = validaCampos(request)
            if (error.error){
                Swal.fire({
                    title: 'Erro ao alterar!',
                    text: error.msgError,
                    type: 'error'
                }) 
            }else{
                dispatch(Store.updateBot(request, props))
            }
        }  
    }
}

const TableBotsContainer = connect(mapStateToProps, mapDispatchToProps)(TableBots);

export default TableBotsContainer;
