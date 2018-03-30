import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
} from 'reactstrap';

import { ForgotPasswordForm } from 'Modules/User';
import './ForgotPassword.scss';

export class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password app">
        <div className="background-image" />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Forgot password?</h1>
                    <p className="text-muted">Please enter the email address registered on your account.</p>
                    <ForgotPasswordForm/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
