import { Field, Form, FormikErrors, FormikProps, Formik } from 'formik';
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
  username: string;
  password: string;
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

export class LoginForm extends Component<any, any> {
  private initialValues: IFormValues;
  constructor(props: any) {
    super(props);

    this.initialValues = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {}

  validate(values: IFormValues) {
    const errors: FormikErrors<any> = {};
    const { username, password } = values;
    const { required } = Rules;
    const usernameValidator = new Validator('Username or Email', username, [
      required,
    ]);
    const passwordValidator = new Validator('Password', password, [required]);

    errors.username = usernameValidator.validate();
    errors.password = passwordValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  public render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => <InnerForm {...formikProps} />}
        validate={this.validate}
      />
    );
  }
}
