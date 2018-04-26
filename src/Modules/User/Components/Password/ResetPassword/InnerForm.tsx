import { LoadingIndicator } from 'Components/LoadingIndicator';
import { Field, Form, FormikProps } from 'formik';
import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

export interface IFormValues {
  password: string;
  confirmPassword: string;
}

export interface IFormProps {
  success: boolean;
  serverError: string;
}

export const InnerForm = (props: IFormProps & FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting, success, serverError } = props;
  return (
    <Fragment>
      {success ? (
        <Fragment>
          <h2>Reset password successfullly!</h2>
          <p>
            Your password has been changed. You can now{' '}
            <Link to="/login">log in</Link> with your new credentials.
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Reset password</h1>
          <p className="text-muted">Please enter your new password.</p>
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
                  errors.password && (
                    <FormFeedback>{errors.password}</FormFeedback>
                  )}
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

            {serverError && (
              <Alert className="capitalize-first-letter" color="danger">
                Reset password link has expired. Please request another link{' '}
                <Link to="/forgot-password">here</Link>.
              </Alert>
            )}

            {isSubmitting ? (
              <div className="d-flex justify-content-center">
                <LoadingIndicator />
              </div>
            ) : (
              <Button color="success" block disabled={isSubmitting}>
                Reset password
              </Button>
            )}
          </Form>
        </Fragment>
      )}
    </Fragment>
  );
};
