import { Field, Form, FormikProps } from 'formik';
import * as React from 'react';
import { Alert, Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import './PasswordForm.scss';

export interface IFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IFormProps {
  onCloseModal?: any;
  hadPass?: boolean;
  success?: boolean;
  serverError?: string;
}

export const InnerForm = (props: IFormProps & FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting, hadPass, onCloseModal, serverError, success } = props;
  return (
    <Form className="password-form">
      {hadPass ? (
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Current password</Label>
              <Field
                type="password"
                name="currentPassword"
                className="form-control"
                placeholder="Enter your Current password"
              />
              {touched.currentPassword &&
              errors.currentPassword && (
                <FormFeedback>{errors.currentPassword}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">New password</Label>
            <Field
              type="password"
              name="newPassword"
              className="form-control"
              placeholder="Enter your New password"
            />
            {touched.newPassword &&
            errors.newPassword && (
              <FormFeedback>{errors.newPassword}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">Confirm password</Label>
            <Field
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Enter your Confirm password"
            />
            {touched.confirmPassword &&
            errors.confirmPassword && (
              <FormFeedback>{errors.confirmPassword}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      {serverError && (
        <Alert className="capitalize-first-letter" color="danger">
          {serverError}
        </Alert>
      )}

      {success && (
        <Alert className="capitalize-first-letter" color="success">
          Password is changed successfully.
        </Alert>
      )}

      <div className="footer-form">
        <Button color="secondary" onClick={() => onCloseModal()}>
          CANCEL
        </Button>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          SAVE
        </Button>
      </div>
    </Form>
  );
};

