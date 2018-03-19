import { Component } from 'react';
import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardLink
} from 'reactstrap';
import { LoginForm, LoginByThirdParty } from "../../Modules/User";
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
                    <LoginForm></LoginForm>
                  </CardBody>
                  <CardFooter className="p-3 pr-4 pl-4">
                    <LoginByThirdParty></LoginByThirdParty>
                  </CardFooter>
                  <CardFooter className="p-3 pr-4 pl-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <CardLink href="/forgot-password">Forgot your password?</CardLink>
                      </Col>
                      <Col xs="12" sm="6">
                        <CardLink href="/register">Create an account</CardLink>
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