import { ResetPasswordForm } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import './ResetPassword.scss';

export class ResetPassword extends Component {
  public render() {
    return (
      <div className="reset-password">
        <div className="reset-password__background-image" />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <ResetPasswordForm />
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
