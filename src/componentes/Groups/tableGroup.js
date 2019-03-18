import React, { Component } from 'react';
import { Button,ButtonGroup, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import Store from '../../store/storage';

class TableGroup extends Component {

    constructor(props){
        super(props)
        this.state = {
            listgroups:this.props.store.listgroups,
            currentPage:1,
            prevPage:1,
            nextPage: 2,
            groupsPerPage:10        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            prevPage: (Number(event.target.id) - 1 <= 0)?0:Number(event.target.id) - 1,
            currentPage: (Number(event.target.id) === 0)?1:Number(event.target.id),
            nextPage:Number(event.target.id) +1 
        });
    }

    render() {
        const {  currentPage, groupsPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * groupsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - groupsPerPage;
        const currentGroups = this.props.store.listgroups.slice(indexOfFirstTodo, indexOfLastTodo);
      
        const renderGroups = currentGroups.map((group, index) => {
            return  (<tr key={index}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td>{group.privacy}</td>
                        <td>
                            <ButtonGroup size="sm">
                                <Button color="danger">Remover membros</Button>
                            </ButtonGroup>
                        </td>
                    </tr>)
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.store.listgroups.length / groupsPerPage); i++) {
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
                    {this.state.nextPage !== currentPage &&  this.state.nextPage <= pageNumbers.length &&
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
                        <i className="fa fa-align-justify"></i> Lista de Grupos
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderGroups}
                            </tbody>
                        </Table>
                        {this.props.store.listgroups.length > 0 &&
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

const TableGroupContainer = connect(mapStateToProps, mapDispatchToProps)(TableGroup);

export default TableGroupContainer;
