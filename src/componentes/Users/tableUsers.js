import React, { Component } from 'react';
import { Button,ButtonGroup, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Modal,  ModalBody,  } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Store from '../../store/storage';
import UpdateUser from './updateUsers'
import validaCampos from './../../utils/validaCampo'


class TableUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            listusers: this.props.store.listusers,
            currentPage:1,
            prevPage:1,
            nextPage: 2,
            usersPerPage:10,
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
        const { currentPage, usersPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * usersPerPage;
        const indexOfFirstTodo = indexOfLastTodo - usersPerPage;
        const currentusers = this.props.store.listusers.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderusers = currentusers.map((user, index) => {
            return  (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.groupAccess}</td>
                        <td>{user.active === 1 ? "Ativo": "Inativo"}</td>
                        <td>
                            <ButtonGroup size="sm">
                                <Button color="warning" id={user.id} onClick={this.toggle}>Alterar</Button>
                                <Modal isOpen={this.state.modal[user.id]} toggle={this.toggle} className={this.props.className}>
                                    <ModalBody>
                                        <UpdateUser {...this.props} user = {user}/>
                                    </ModalBody>
                                </Modal>
                                <Button  type="submit" size="sm" color="danger"  onClick={event=>this.props.removeUser(user.id, event, this.props)} >Remover</Button>
                            </ButtonGroup>
                        </td>
                    </tr>)
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.store.listusers.length / usersPerPage); i++) {
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
                        <i className="fa fa-align-justify"></i> <strong>Lista de Usuários</strong>
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Grupo de Acesso</th>
                                    <th>Ativo?</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderusers}
                            </tbody>
                        </Table>
                        {this.props.store.listusers.length > 0 &&
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
        removeUser(id,event, props){
            event.preventDefault()
            dispatch(Store.removeUser(id,props));
        },    
        getAllUsers(){
            dispatch(Store.getAllUsers());
        },
        updateUser(request, ev, props){
            ev.preventDefault();
            var error = validaCampos(request)
            if (error.error){
                Swal.fire({
                    title: 'Erro ao alterar!',
                    text: error.msgError,
                    type: 'error'
                }) 
            }else{
                dispatch(Store.updateUser(request, props))
            }
        }
    }
}

const TableUserContainer = connect(mapStateToProps, mapDispatchToProps)(TableUser);

export default TableUserContainer;
