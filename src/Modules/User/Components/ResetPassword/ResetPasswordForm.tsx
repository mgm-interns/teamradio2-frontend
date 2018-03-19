import { Component } from 'react';
import * as React from 'react';
import {
  Form,
  FormGroup, Input, InputGroup, Button, FormFeedback
} from 'reactstrap';
import LoadingIndicator from '../../../../Components/LoadingIndicator';

export default class ResetPasswordForm extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <InputGroup className="mb-3">
            <Input type="password" placeholder="New password"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <Input type="password" placeholder="Confirm new password"/>
          </InputGroup>
        </FormGroup>
        <Button color="success" block>Reset password</Button>
      </Form>
    );
  }
}