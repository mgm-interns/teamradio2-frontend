import * as React from 'react';
import { Component } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, InputGroup, FormFeedback, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Rules, Validator } from 'Helpers';

interface FormValues {
  username: string;
  password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const {touched, errors, isSubmitting} = props;
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"/>
          </InputGroupText>
        </InputGroupAddon>
        <Field name="username" type="text" className="form-control" placeholder="Username or Email"/>
        {touched.username && errors.username && <FormFeedback>{errors.username}</FormFeedback>}
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Field name="password" type="password" className="form-control" placeholder="Password"/>
        {touched.password && errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </InputGroup>
      <Button color="success" block disabled={isSubmitting}>LOG IN</Button>
    </Form>
  );
};

const FormWrapper = withFormik<any, FormValues>({
  mapPropsToValues: props => {
    return {
      username: '',
      password: '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const {username, password} = values;
    const {required} = Rules;
    const usernameValidator = new Validator("Username or Email", username, [required]);
    const passwordValidator = new Validator("Password", password, [required]);

    errors.username = usernameValidator.validate();
    errors.password = passwordValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (<FormWrapper/>)
  }
}

