import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, FormFeedback } from 'reactstrap';
import { isValidEmail } from '../../../../Util';

interface FormValues {
  email: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup>
          <Field type="email" name="email" className="form-control"/>
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
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export const ForgotPasswordForm = () => (
    <FormWrapper />
);
