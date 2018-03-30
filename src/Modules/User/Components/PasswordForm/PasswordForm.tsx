import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import './PasswordForm.scss';

interface IFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCloseModal: any;
  hadPass: boolean;
}

const InnerForm = (props: IFormProps & FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className="password-form">
      {props.initialValues.hadPass ? (
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
      <div className="footer-form">
        <Button color="secondary" onClick={() => props.onCloseModal()}>
          CANCEL
        </Button>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          SAVE
        </Button>
      </div>
    </Form>
  );
};

// The type of props FormWrapper receives
interface IFormProps {
  onCloseModal: any;
  hadPass?: boolean;
}

const FormWrapper = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      onCloseModal: props.onCloseModal,
      hadPass: props.hadPass || false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },

  validate: (values: IFormValues) => {
    const errors: FormikErrors<any> = {};
    const { currentPassword, newPassword, confirmPassword } = values;
    const { required, minLength6, matchPassword } = Rules;

    if (values.hadPass) {
      const currentPasswordValidator = new Validator(
        'Current password',
        currentPassword,
        [required, minLength6],
      );
      errors.currentPassword = currentPasswordValidator.validate();
    }

    const newPasswordValidator = new Validator('New password', newPassword, [
      required,
      minLength6,
    ]);
    const confirmPasswordValidator = new Validator(
      'Confirm password',
      confirmPassword,
      [required, matchPassword(newPassword)],
    );

    errors.newPassword = newPasswordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values);
    values.onCloseModal();
  },
})(InnerForm);

export class PasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <FormWrapper
        onCloseModal={this.props.onCloseModal}
        hadPass={this.props.hadPass}
      />
    );
  }
}
