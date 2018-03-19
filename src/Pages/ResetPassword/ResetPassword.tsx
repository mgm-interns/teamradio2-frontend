import { Component } from 'react';
import * as React from 'react';
import {
  Container, Row, Col,
  Card, CardBody,
  Form, FormGroup, Input, InputGroup, Button
} from 'reactstrap';
import './ResetPassword.scss';

export class ResetPassword extends Component {
  render() {
    return (
      <div className="reset-password">
        <div className="reset-password__background-image"></div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Reset password</h1>
                    <p className="text-muted">Please enter your new password.</p>
                    <Form>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          <Input type="password" placeholder="New password"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <Input type="password" placeholder="Confirm new password"/>
                        </InputGroup>
                      </FormGroup>
                    </Form>
                    <Button color="success" block>Reset password</Button>
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