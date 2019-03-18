import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Store from '../store/storage';
import logo from '../assets/img/brand/logoDev.svg'
import { Button, Card, CardHeader,CardBody,  Col, Container, Form,  InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Loader from './Loader'

class Login extends Component {

    render() {
        return (

            <div className="app flex-row align-items-center">
            <Loader {...this.props} />
                <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="6" md="4">
                        <Card className="p-4 card-accent-primary" >
                            <CardHeader className="justify-content-center">
                                <h3>AdminPlace</h3>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-user"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <input type="email" placeholder="Usuário" id="email" autoComplete="username" name="email"  className="form-control"
                                            ref={input => this.email = input} required/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-lock"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <input type="password" placeholder="Senha" id="password" autoComplete="password" name="password"  className="form-control"
                                            ref={input => this.password = input} required/>
                                    </InputGroup>
                                    <Row className="justify-content-center">
                                        <Col xs="12">
                                            <Button color="primary" size="md" onClick={ev=>this.props.fazerLogin(ev,this.email, this.password)} className="btn btn-primary float-right btn-block btn-flat">Login <i className="icon-login"></i></Button>
                                        </Col>
                                        <Col xs="6" className="text-right">
                                            <Button color="link" href="/forgotPassword" className="px-0">Esqueceu a senha?</Button>
                                        </Col>
                                    </Row>
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

        fazerLogin (ev, email, password) {
            ev.preventDefault();
            dispatch(Store.autenticar(email.value, password.value, this.history))

        }
    }
}

Login.contextTypes = {
    store: PropTypes.object.isRequired
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer
