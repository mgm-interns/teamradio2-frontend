import { Field, Form, Formik, FormikActions, FormikErrors, FormikProps } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import {
  Button,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from 'reactstrap';
import { UserServices } from 'Services/Http';

interface IFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IFormProps {
  success: boolean;
  serverError: string;
}

const InnerForm = (props: FormikProps<IFormValues> & IFormProps) => {
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
        <Alert color="danger">{serverError}</Alert>
      )}

      {success && (
        <Alert color="success">You have successfully registered!</Alert>
      )}

      <Button color="success" block disabled={isSubmitting}>
        SIGN UP
      </Button>
    </Form>
  );
};

export class RegisterForm extends Component<any, any> {
  private userServices: UserServices;
  private initialValues: IFormValues;

  constructor(props: any) {
    super(props);

    this.initialValues = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.state = {
      success: false,
      serverError: ''
    };

    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: IFormValues, { setSubmitting, resetForm }: FormikActions<any>) {
    this.setState({
      serverError: '',
      success: false
    });

    const { username } = values;
    const formValues = { ...values };
    if(username === '') {
      formValues.username = null;
    }

    this.userServices.register(formValues).subscribe(
      (res: any) => {
        this.setState({ success: true });
        setSubmitting(false);
        resetForm();
      },
      (err: any) => {
        this.setState({
          serverError: err
        });
        setSubmitting(false);
      },
    );
  }

  validate(values: IFormValues) {
    const errors: FormikErrors<any> = {};
    const { name, username, email, password, confirmPassword } = values;
    const {
      required,
      validEmail,
      validUsername,
      validDisplayName,
      maxLength15,
      minLength6,
      matchPassword,
    } = Rules;
    const displayNameValidator = new Validator('Display name', name, [
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

    errors.name = displayNameValidator.validate();
    errors.username = usernameValidator.validate();
    errors.email = emailValidator.validate();
    errors.password = passwordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  public render() {
    const { success, serverError } = this.state;
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => (
          <InnerForm {...formikProps} success={success} serverError={serverError}/>
        )}
        validate={this.validate}
      />
    );
  }
}
