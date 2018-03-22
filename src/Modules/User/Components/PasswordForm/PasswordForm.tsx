import * as React from 'react';
import { Component } from 'react';
import { Row, Col, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import "./PasswordForm.scss";

import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Rules, Validator } from '../../../../Helpers';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCloseModal: any;
}

const InnerForm = (props: FormProps & FormikProps<FormValues>) => {
  const {touched, errors, isSubmitting} = props;
  return (
    <Form className="password-form">
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">Current password</Label>
            <Field type="password" name="currentPassword" className="form-control"
                   placeholder="Enter your Current password"/>
            {touched.currentPassword && errors.currentPassword && <FormFeedback>{errors.currentPassword}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">New password</Label>
            <Field type="password" name="newPassword" className="form-control" placeholder="Enter your New password"/>
            {touched.newPassword && errors.newPassword && <FormFeedback>{errors.newPassword}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">Confirm password</Label>
            <Field type="password" name="confirmPassword" className="form-control"
                   placeholder="Enter your Confirm password"/>
            {touched.confirmPassword && errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <div className="footer-form">
        <Button color="secondary" onClick={() => props.onCloseModal()}>CANCEL</Button>
        <Button type="submit" color="primary" disabled={isSubmitting}>SAVE</Button>
      </div>
    </Form>
  );
};

// The type of props FormWrapper receives
interface FormProps {
  onCloseModal: any;
}

const FormWrapper = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      onCloseModal: props.onCloseModal,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    const {currentPassword, newPassword, confirmPassword} = values;
    const {required, minLength6, matchPassword} = Rules;

    const currentPasswordValidator = new Validator("Current password", currentPassword, [required, minLength6]);
    const newPasswordValidator = new Validator("New password", newPassword, [required, minLength6]);
    const confirmPasswordValidator = new Validator("Confirm password", confirmPassword, [required, matchPassword(newPassword)]);

    errors.currentPassword = currentPasswordValidator.validate();
    errors.newPassword = newPasswordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (values) => {
    console.log(values);
    values.onCloseModal();
  },
})(InnerForm);

export class PasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (<FormWrapper onCloseModal={this.props.onCloseModal}/>)
  }

}