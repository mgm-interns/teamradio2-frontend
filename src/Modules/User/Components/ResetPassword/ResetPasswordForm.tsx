import * as React from 'react';
import { Component } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, FormFeedback } from 'reactstrap';
import { Rules, Validator } from '../../../../Helpers';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup className="mb-3">
          <Field name="password" type="password" className="form-control" placeholder="Password"/>
          {touched.password && errors.password && <FormFeedback>{errors.password}</FormFeedback>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Field name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password"/>
          {touched.confirmPassword && errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>Reset password</Button>
    </Form>
  );
};

const FormWrapper = withFormik<any, FormValues>({
  mapPropsToValues: props => {
    return {
      password: '',
      confirmPassword: '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const { password, confirmPassword } = values;
    const {required, minLength6, matchPassword} = Rules;

    const passwordValidator = new Validator("Password", password, [required, minLength6]);
    const confirmPasswordValidator = new Validator("Confirm password", confirmPassword, [required, matchPassword(password)]);

    errors.password = passwordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export class ResetPasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (<FormWrapper/>)
  }

}