import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, FormFeedback } from 'reactstrap';
import { required, minLength6, matchPassword } from '../../../../Util';

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
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      password: '',
      confirmPassword: '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const { password, confirmPassword } = values;
    if (required(password)) {
      errors.password = required(password);
    }
    else if(minLength6(password)) {
      errors.password = minLength6(password);
    }
    else if(matchPassword(password, confirmPassword)) {
      errors.confirmPassword = matchPassword(password, confirmPassword);
    }
    if (required(confirmPassword)) {
      errors.confirmPassword = required(confirmPassword);
    }

    return errors;
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm);

export const ResetPasswordForm = () => (
  <FormWrapper />
);
