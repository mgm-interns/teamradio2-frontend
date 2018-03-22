import * as React from 'react';
import { Component } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, FormFeedback } from 'reactstrap';
import { Rules, Validator } from '../../../../Helpers';

interface FormValues {
  email: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup>
          <Field type="email" name="email" className="form-control" placeholder="Your email"/>
          {touched.email && errors.email && <FormFeedback>{errors.email}</FormFeedback>}
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>Reset password</Button>
    </Form>
  );
};

// The type of props FormWrapper receives
interface FormProps {
  initialEmail?: string;
}

const FormWrapper = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const {required, validEmail} = Rules;
    const emailValidator = new Validator("Email", values.email, [required, validEmail]);
    errors.email = emailValidator.validate();
    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export class ForgotPasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (<FormWrapper/>)
  }

}