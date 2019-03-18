import React, { Component } from 'react';
import { Button,ButtonGroup, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Modal,  ModalBody,  } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Store from '../../store/storage';
import UpdateEmployee from './updateEmployee'
import validaCampos from './../../utils/validaCampo'


class TableEmployee extends Component {

    constructor(props){
        super(props)
        this.state = {
            listemployees: this.props.store.listemployees,
            currentPage:1,
            prevPage:1,
            nextPage: 2,
            empsPerPage:10,
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
        const { currentPage, empsPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * empsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - empsPerPage;
        const currentemps = this.props.store.listemployees.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderemps = currentemps.map((emp, index) => {
            return  (
                    <tr key={index}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.jobTitle}</td>
                        <td>{emp.employeeNumber}</td>
                        <td>
                            <ButtonGroup size="sm">
                                <Button color="warning" id={emp.id} onClick={this.toggle}>Alterar</Button>
                                <Modal isOpen={this.state.modal[emp.id]} toggle={this.toggle} className={this.props.className}>
                                    <ModalBody>
                                        <UpdateEmployee {...this.props} employee = {emp}/>
                                    </ModalBody>
                                </Modal>
                                <Button  type="submit" size="sm" color="danger"  onClick={event=>this.props.removeEmployee(emp.id, event, this.props)} >Remover</Button>
                            </ButtonGroup>
                        </td>
                    </tr>)
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.store.listemployees.length / empsPerPage); i++) {
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
                        <i className="fa fa-align-justify"></i> Lista de Colaboradores
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Cargo</th>
                                    <th>Nº Colaborador</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderemps}
                            </tbody>
                        </Table>
                        {this.props.store.listemployees.length > 0 &&
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
        removeEmployee(id,event, props){
            event.preventDefault()
            dispatch(Store.removeEmployee(id,props));
        },    
        getAllEmployee(){
            dispatch(Store.getAllEmployees());
        },
        updateEmployee(request, ev, props){
            ev.preventDefault();
            var error = validaCampos(request)
            console.log(request)
            if (error.error){
                Swal.fire({
                    title: 'Erro ao alterar!',
                    text: error.msgError,
                    type: 'error'
                }) 
            }else{
                dispatch(Store.updateEmployee(request, props))
            }
        }
    }
}

const TableEmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(TableEmployee);

export default TableEmployeeContainer;
