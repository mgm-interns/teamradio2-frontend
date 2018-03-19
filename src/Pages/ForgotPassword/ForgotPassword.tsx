import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
} from 'reactstrap';

import ForgotPasswordForm from '../../Modules/User/Components/ForgotPassword';
import './ForgotPassword.scss';

export class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password">
        <div className="forgot-password__background-image"></div>
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

                  {/*<CardBody className="mx-4">*/}
                    {/*<p>We have sent you an email. Click the link in the email to*/}
                      {/*reset your password.</p>*/}
                    {/*<p>If you do not see the email, check other places it might be,*/}
                      {/*like your junk, spam, social, or other folders.</p>*/}
                  {/*</CardBody>*/}

                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}