import { Field, Form, FormikProps } from 'formik';
import { UnregisteredUser } from 'Models/index';
import * as React from 'react';
import {
  Alert,
  Button,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

export class FormValues extends UnregisteredUser {
  public confirmPassword: string;
}

export interface IFormProps {
  success: boolean;
  serverError: string;
}

export const InnerForm = (props: FormikProps<FormValues> & IFormProps) => {
  const { touched, errors, isSubmitting, success, serverError } = props;
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="name"
          type="text"
          className="form-control"
          placeholder="Display Name"
        />
        {touched.name &&
          errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </InputGroup>
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
          placeholder="Username"
        />
        {touched.username &&
          errors.username && <FormFeedback>{errors.username}</FormFeedback>}
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Field
          name="email"
          type="text"
          className="form-control"
          placeholder="Email"
        />
        {touched.email &&
          errors.email && <FormFeedback>{errors.email}</FormFeedback>}
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
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="confirmPassword"
          type="password"
          className="form-control"
          placeholder="Confirm password"
        />
        {touched.confirmPassword &&
          errors.confirmPassword && (
            <FormFeedback>{errors.confirmPassword}</FormFeedback>
          )}
      </InputGroup>

      {serverError && (
        <Alert className="capitalize-first-letter" color="danger">
          {serverError}
        </Alert>
      )}

      {success && (
        <Alert className="capitalize-first-letter" color="success">
          You have successfully registered!
        </Alert>
      )}

      <Button color="success" block disabled={isSubmitting}>
        SIGN UP
      </Button>
    </Form>
  );
};
