import {Component} from 'react';
import * as React from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, CardLink} from 'reactstrap';
import './Login.scss'

export class Login extends Component {
    render() {
        return (
            <div>
                <div className="background-image"></div>
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <Card className="mx-4">
                                    <CardBody className="p-4">
                                        <h1>Login</h1>
                                        <p className="text-muted">For listening and sharing music</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username or Email"/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password"/>
                                        </InputGroup>
                                        <Button color="success" block>LOG IN</Button>
                                    </CardBody>
                                    <CardFooter className="p-3">
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <Button className="btn-facebook" block><span>facebook</span></Button>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Button className="btn-google-plus" block><span>google</span></Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                    <CardFooter className="p-3">
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <CardLink href={'#'}>Forgot your password?</CardLink>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <CardLink href={'#'}>Create an account</CardLink>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}