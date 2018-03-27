import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import {
  Button,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

interface IFormValues {
  displayName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
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
          name="displayName"
          type="text"
          className="form-control"
          placeholder="Display Name"
        />
        {touched.displayName &&
          errors.displayName && (
            <FormFeedback>{errors.displayName}</FormFeedback>
          )}
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
      <Button color="success" block disabled={isSubmitting}>
        LOG IN
      </Button>
    </Form>
  );
};

const FormWrapper = withFormik<any, IFormValues>({
  mapPropsToValues: props => {
    return {
      displayName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },

  validate: (values: IFormValues) => {
    const errors: FormikErrors<any> = {};
    const { displayName, username, email, password, confirmPassword } = values;
    const {
      required,
      validEmail,
      validUsername,
      validDisplayName,
      maxLength15,
      minLength6,
      matchPassword,
    } = Rules;
    const displayNameValidator = new Validator('Display name', displayName, [
      required,
      validDisplayName,
      maxLength15,
    ]);
    const usernameValidator = new Validator('Username', username, [
      validUsername,
    ]);
    const emailValidator = new Validator('Email', email, [
      required,
      validEmail,
    ]);
    const passwordValidator = new Validator('Password', password, [
      required,
      minLength6,
    ]);
    const confirmPasswordValidator = new Validator(
      'Confirm password',
      confirmPassword,
      [required, matchPassword(password)],
    );

    errors.displayName = displayNameValidator.validate();
    errors.username = usernameValidator.validate();
    errors.email = emailValidator.validate();
    errors.password = passwordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);

export class RegisterForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <FormWrapper />;
  }
}
