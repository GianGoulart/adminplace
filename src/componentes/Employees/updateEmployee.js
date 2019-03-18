import React, { Component } from 'react';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,} from 'reactstrap';

class UpdateEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.employee.id,
            name: this.props.employee.name,
            first_name:this.props.employee.firstName,
            last_name:this.props.employee.lastName,
            email:this.props.employee.email,
            job_title:this.props.employee.jobTitle,
            department:this.props.employee.department,
        }    
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] :  e.target.value
        })        
    }

    render(){
        return(
            <Card id={this.props.employee.id}>
                <CardHeader>
                    <strong>Alterar registro colaborador <i className="fa fa-users"></i></strong>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="name">Nome Completo:</Label>
                        <input type="text" className="form-control form-control-md" value={this.state.name} name="name" id="name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o nome do colaborador" required />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="first_name">Primeiro Nome:</Label>
                                <input type="text" className="form-control form-control-md" value={this.state.first_name} name="first_name" id="first_name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o primeiro nome" required />
                            </FormGroup>
                        </Col>
                        <Col xs="6" >
                            <FormGroup>
                                <Label htmlFor="last_name">Último Nome:</Label>
                                <input type="text" className="form-control form-control-md" value={this.state.last_name} name="last_name" id="last_name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o ultimo nome" required />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>                                    
                        <Label htmlFor="email">Email:</Label>
                        <input type="email" className="form-control form-control-md" value={this.state.email} name="email" id="email" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o email do colaborador" required />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="job_title">Cargo:</Label>
                                <input type="text" className="form-control form-control-md" value={this.state.job_title} name="job_title" id="job_title" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o cargo do colaborador"  required />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="department">Departamento:</Label>
                                <input type="text" className="form-control form-control-md" value={this.state.department} name="department" id="department" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o departamento do colaborador"  required />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.updateEmployee(this.state, event, this.props)} ><i className="fa fa-upload"></i> Alterar</Button>
                    <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
            </Card>
        )
    }
}

export default UpdateEmployee