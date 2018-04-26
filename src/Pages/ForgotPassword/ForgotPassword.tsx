import { Component } from 'react';
import * as React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import { ForgotPasswordForm } from 'Modules/User';
import './ForgotPassword.scss';

export class ForgotPassword extends Component {
  public render() {
    return (
      <div className="forgot-password app flex-row align-items-center">
        <div className="background-image" />
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <ForgotPasswordForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
