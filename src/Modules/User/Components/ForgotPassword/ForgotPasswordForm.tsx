import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, FormFeedback } from 'reactstrap';
import { required, validEmail, Validator} from '../../../../Util';

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
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const emailValidator = new Validator("Email", values.email, [required, validEmail]);
    errors.email = emailValidator.validate();
    return errors;
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export const ForgotPasswordForm = () => (
    <FormWrapper />
);
