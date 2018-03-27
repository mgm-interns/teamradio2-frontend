import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
} from 'reactstrap';
import { ResetPasswordForm } from 'Modules/User';
import './ResetPassword.scss';

export class ResetPassword extends Component {
  render() {
    return (
      <div className="reset-password">
        <div className="reset-password__background-image" />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Reset password</h1>
                    <p className="text-muted">Please enter your new password.</p>
                    <ResetPasswordForm/>
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
