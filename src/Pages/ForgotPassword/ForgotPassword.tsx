import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
} from 'reactstrap';

import { ForgotPasswordForm } from '../../Modules/User';
import './ForgotPassword.scss';

export class ForgotPassword extends Component {
  render() {
    return (
      <div className="app forgot-password">
        <img src="img/forgot-password-background.jpeg" alt="" className="background-image"/>
        <div className="main-form-container">
          <Col md="6" className="main-form-layout">
            <Card className="mx-4">
              <CardBody className="p-4">
                <h1>Forgot password?</h1>
                <p className="text-muted">Please enter the email address registered on your account.</p>
                <ForgotPasswordForm/>
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    );
  }
}