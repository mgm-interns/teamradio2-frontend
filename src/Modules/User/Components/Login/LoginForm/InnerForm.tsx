import { Field, Form, FormikProps } from 'formik';
import { UnauthorizedUser } from 'Models';
import * as React from 'react';
import {
  Button,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

export class FormValues extends UnauthorizedUser {}

export interface IFormProps {
  success: boolean;
  serverError: string;
}

export const InnerForm = (props: FormikProps<FormValues> & IFormProps) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="username"
          type="text"
          className="form-control"
          placeholder="Username or Email"
        />
        {touched.username &&
          errors.username && <FormFeedback>{errors.username}</FormFeedback>}
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
        />
        {touched.password &&
          errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </InputGroup>
      <Button color="success" block disabled={isSubmitting}>
        LOG IN
      </Button>
    </Form>
  );
};
