import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
  Form, FormText,
  FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormFeedback
} from 'reactstrap';

import './ForgotPassword.scss';
import LoadingIndicator from '../../Components/LoadingIndicator';

export class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password">
        <div className="background-image"></div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Forgot password?</h1>
                    <p className="text-muted">Please enter the email address registered on your account.</p>
                    <Form>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          {/*<InputGroupAddon addonType="prepend">*/}
                          {/*<InputGroupText>*/}
                          {/*<i className="icon-envelope"></i>*/}
                          {/*</InputGroupText>*/}
                          {/*</InputGroupAddon>*/}
                          <Input type="text" className="is-invalid" placeholder="Your Email"/>
                          <FormFeedback>Please enter a valid email address</FormFeedback>
                          {/*<FormFeedback>Email address is required</FormFeedback>*/}
                        </InputGroup>
                      </FormGroup>
                    </Form>
                    <div className="loading-container">
                      <LoadingIndicator/>
                    </div>

                    <Button color="success" block>Reset password</Button>
                  </CardBody>

                  <CardBody className="mx-4">
                    <p>We have sent you an email. Click the link in the email to
                      reset your password.</p>
                    <p>If you do not see the email, check other places it might be,
                      like your junk, spam, social, or other folders.</p>
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