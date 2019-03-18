import React, { Component } from 'react';
import {Button,Card,CardBody,CardFooter,CardHeader,Col,FormGroup,Label,} from 'reactstrap';

class UpdateBot extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.bot.id,
            name: this.props.bot.name,
            description:this.props.bot.description,
            secret:this.props.bot.secret,
            verify:this.props.bot.verify,
            active:this.props.bot.active
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
            <Card id={this.props.bot.id}>
                <CardHeader>
                    <strong>Alterar registro do bot <i className="fa fa-cubes"></i></strong>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="name">Nome do bot:</Label>
                        <input type="text" className="form-control form-control-md" value={this.state.name} name="name" id="name" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o nome do bot" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Descrição do bot:</Label>
                        <input type="text" className="form-control form-control-md" value={this.state.description} name="description" id="description" onChange = {(e)=>this.handleChange(e)} placeholder="Insira a descrição do bot" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="secret">Secret:</Label>
                        <input type="text" className="form-control form-control-md" value={this.state.secret} name="secret" id="secret" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o secret do bot" required />
                    </FormGroup>
                    <FormGroup>                                    
                        <Label htmlFor="verify">Verify:</Label>
                        <input type="verify" className="form-control form-control-md" value={this.state.verify} name="verify" id="verify" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o verify do bot" required />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="active">Ativo:</Label>
                                <select className="form-control form-control-md" type="select" name="active" id="active" value={this.state.active} required>
                                    <option value="0">Selecione...</option>
                                    <option value={1}>Sim</option>
                                    <option value={2}>Não</option>
                                </select>                            
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="md" className="float-left" color="primary"  onClick={event=>this.props.updateBot(this.state, event, this.props)} ><i className="fa fa-upload"></i> Alterar</Button>
                    <Button type="reset" size="md" className="float-right" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
            </Card>
        )
    }
}

export default UpdateBot