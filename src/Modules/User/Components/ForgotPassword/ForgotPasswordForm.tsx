import { Component } from 'react';
import * as React from 'react';
import {
  Form,
  FormGroup, Input, InputGroup, Button, FormFeedback
} from 'reactstrap';

export class ForgotPasswordForm extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <InputGroup className="mb-3">
            <Input type="text" placeholder="Your Email"/>
            {/*<Input type="text" className="is-invalid" placeholder="Your Email"/>*/}
            {/*<FormFeedback>Please enter a valid email address</FormFeedback>*/}
            {/*<FormFeedback>Email address is required</FormFeedback>*/}
          </InputGroup>
        </FormGroup>
        {/*<div className="forgot-password__loading-container">*/}
        {/*<LoadingIndicator/>*/}
        {/*</div>*/}

        <Button color="success" block>Reset password</Button>
      </Form>
    );
  }
}