import { Field, Form, FormikProps } from 'formik';
import * as React from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

export interface IFormValues {
  password: string;
  confirmPassword: string;
}

export interface IFormProps {}

export const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup className="mb-3">
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
          <Field
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
          {touched.confirmPassword &&
          errors.confirmPassword && (
            <FormFeedback>{errors.confirmPassword}</FormFeedback>
          )}
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

