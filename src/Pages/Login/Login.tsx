import { LoginWrapper } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardLink,
  Col,
  Container,
  Row,
} from 'reactstrap';
import './Login.scss';

export class Login extends Component {
  public render() {
    return (
      <div className="login app flex-row align-items-center">
        <div className="background-image" />
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Login</h1>
                  <p className="text-muted">For listening and sharing music</p>
                  <LoginWrapper />
                </CardBody>
                <CardFooter className="p-3 pr-4 pl-4">
                  <Row className="other-actions">
                    <Col xs="12" lg="6">
                      <CardLink href="/forgot-password">
                        Forgot your password?
                      </CardLink>
                    </Col>
                    <Col xs="12" lg="6" className="login__register-callout">
                      <CardLink href="/register">Create an account</CardLink>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
