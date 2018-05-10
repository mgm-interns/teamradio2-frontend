import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import './InformationForm.scss';

interface IFormValues {
  name: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  city: string;
  country: string;
  onCloseModal: any;
}

const InnerForm = (props: IFormProps & FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className="information-form">
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">Display name</Label>
            <Field
              className="form-control"
              type="text"
              name="name"
              placeholder="Enter your Display name"
            />
            {touched.name &&
              errors.name && <FormFeedback>{errors.name}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="username">User name</Label>
            <Field
              className="form-control"
              type="text"
              name="username"
              readOnly
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Field
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter your Email"
              readOnly
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="firstName">First name</Label>
            <Field
              className="form-control"
              type="text"
              name="firstName"
              placeholder="Enter your First name"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="lastName">Last name</Label>
            <Field
              className="form-control"
              type="text"
              name="lastName"
              placeholder="Enter your Last name"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <Field
              className="form-control"
              type="text"
              name="bio"
              placeholder="Enter your Bio"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Field
              className="form-control"
              type="text"
              name="city"
              placeholder="Enter your City"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="country">Country</Label>
            <Field
              className="form-control"
              type="text"
              name="country"
              placeholder="Enter your Country"
            />
          </FormGroup>
        </Col>
      </Row>
      <div className="footer-form">
        {/* tslint:disable-next-line */}
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

export interface IFormProps {
  name?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  city?: string;
  country?: string;
  onCloseModal: any;
  handleSubmit: any;
}

export const FormWrapper = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      onCloseModal: props.onCloseModal,
      name: props.name || '',
      username: props.username || '',
      email: props.email || 'test@radio-team.com',
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      bio: props.bio || '',
      city: props.city || '',
      country: props.country || '',
    };
  },

  validate: (values: IFormValues) => {
    const errors: FormikErrors<any> = {};
    const { name } = values;
    const { required } = Rules;

    const nameValidator = new Validator('Display Name', name, [required]);
    errors.name = nameValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (userInfo, informationForm) => {
    informationForm.props.handleSubmit(userInfo);
    userInfo.onCloseModal();
  },
})(InnerForm);
