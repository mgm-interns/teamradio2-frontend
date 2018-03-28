import { Component } from 'react';
import * as React from 'react';
import { Row, Col, Card, CardBody, CardFooter, CardLink } from 'reactstrap';
import { LoginForm, LoginByThirdParty } from "Modules/User";
import './Login.scss'

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <img src="img/login-background.png" alt="" className="background-image"/>
        <div className="main-form-container">
          <Col md="6" className="main-form-layout">
            <div className="card-group">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Login</h1>
                  <p className="text-muted">For listening and sharing music</p>
                  <LoginByThirdParty/>
                  <LoginForm/>
                </CardBody>
                <CardFooter className="p-3 pr-4 pl-4">
                  <Row className="another-actions">
                    <Col xs="12" lg="6">
                      <CardLink href="/forgot-password">Forgot your password?</CardLink>
                    </Col>
                    <Col xs="12" lg="6" className="register-callout">
                      <CardLink href="/register">Create an account</CardLink>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}