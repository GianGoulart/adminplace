import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Store from '../store/storage';
import { Button, Card, CardBody,  Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Registro extends Component {
  constructor(props){
    super(props)
    this.state={
      email: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h3>Alterar senha <i className="icon-lock"></i></h3>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <input type="email" className="form-control form-control-md" value={this.state.email} name="email" id="email" onChange = {(e)=>this.handleChange(e)} placeholder="Insira o email do colaborador" required />
                    </InputGroup>
                    <Button color="success" block onClick={e=>this.props.sendEmail(e, this.state)}>Enviar email<i className="fa fa-send-o"></i></Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return { store: state }
};

const mapDispatchToProps = dispatch => {
    return {
        verificaErros() {
            let register = [];
            dispatch({ type: 'REGISTER', register });
        },

        sendEmail(ev, request) {
          ev.preventDefault();
          dispatch(Store.sendEmail(request.email))
        }
    }
}

Registro.contextTypes = {
    store: PropTypes.object.isRequired
}

const RegistroContainer = connect(mapStateToProps, mapDispatchToProps)(Registro);


export default RegistroContainer;
