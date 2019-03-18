import React, { Component } from 'react';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,} from 'reactstrap';

class UpdateUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.user.id,
            name: this.props.user.name,
            email:this.props.user.email,
            password:this.props.user.password,
            groupAccess:this.props.user.groupAccess,
            active: this.props.user.active
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
            <Card id={this.props.user.id}>
                <CardHeader>
                    <strong>Alterar registro usuário <i className="fa fa-users"></i></strong>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="name">Nome Usuário:</Label>
                        <input type="text" className="form-control form-control-md" value={this.state.name} name="name" id="name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o nome do colaborador" required />
                    </FormGroup>
                    <FormGroup>                                    
                        <Label htmlFor="email">Email:</Label>
                        <input type="email" className="form-control form-control-md" value={this.state.email} name="email" id="email" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o email do colaborador" required />
                    </FormGroup>
                    <FormGroup>                                    
                        <Label htmlFor="email">Senha:</Label>
                        <input type="password" className="form-control form-control-md" value={this.state.password} name="password" id="password" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o senha do colaborador" required />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="group">Grupo de Acesso:</Label>
                                <select className="form-control form-control-md" type="select" value={this.state.groupAccess} name="groupAccess" id="groupAccess" onChange = {(e)=>this.handleChange(e)} required>
                                    <option value="0">Selecione...</option>
                                    <option value="adm">Adm</option>
                                    <option value="user">Usuário</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="group">Ativo?</Label>
                                <select className="form-control form-control-md" type="select" value={this.state.active} name="active" id="active" onChange = {(e)=>this.handleChange(e)} required>
                                    <option value="0">Selecione...</option>
                                    <option value="1">Ativo</option>
                                    <option value="-1">Inativo</option>
                                </select>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.updateUser(this.state, event, this.props)} ><i className="fa fa-upload"></i> Alterar</Button>
                    <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
            </Card>
        )
    }
}

export default UpdateUser