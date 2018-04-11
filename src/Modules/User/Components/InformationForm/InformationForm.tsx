import * as React from 'react';
import { Component } from 'react';
import { Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import './InformationForm.scss';

import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import { UserServices } from 'Services/Http';
import { RegisteredUser } from "../../../../Models/User";

interface IFormValues {
  displayName: string;
  userName: string;
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
            <Label htmlFor="displayName">Display name</Label>
            <Field
              className="form-control"
              type="text"
              name="displayName"
              placeholder="Enter your Display name"
            />
            {touched.displayName &&
            errors.displayName && (
              <FormFeedback>{errors.displayName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="userName">User name</Label>
            <Field
              className="form-control"
              type="text"
              name="userName"
              placeholder="Enter your username"
            />
            {touched.userName &&
            errors.userName && <FormFeedback>{errors.userName}</FormFeedback>}
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

// The type of props FormWrapper receives
interface IFormProps {
  displayName?: string;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  city?: string;
  country?: string;
  onCloseModal: any;
  handleSubmit: any;
}

const FormWrapper = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      onCloseModal: props.onCloseModal,
      displayName: props.displayName || '',
      userName: props.userName || '',
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
    const { displayName, userName } = values;
    const { required } = Rules;

    const displayNameValidator = new Validator('Display Name', displayName, [
      required,
    ]);
    const userNameValidator = new Validator('RegisteredUser name', userName, [
      required,
    ]);

    errors.displayName = displayNameValidator.validate();
    errors.userName = userNameValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (userInfo, informationForm) => {
    console.log(userInfo);
    informationForm.props.handleSubmit(userInfo);
  },

})(InnerForm);

interface IInformationFormStates {
  userInformation: RegisteredUser;
  onCloseModal: boolean;
}

export class InformationForm extends Component<any, IInformationFormStates> {
  private readonly userServices: UserServices;

  constructor(props: any) {
    super(props);
    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentWillMount() {
    const {userInformation, onCloseModal} = this.props;
    this.setState({
      userInformation,
      onCloseModal
    });
  }

  public handleSubmit(userInfo: IFormProps) {
    const user = new RegisteredUser();
    user.name = userInfo.displayName;
    user.username = userInfo.userName;
    user.email = userInfo.email;
    user.firstName = userInfo.firstName;
    user.lastName = userInfo.lastName;
    user.bio = userInfo.bio;
    user.city = userInfo.city;
    user.country = userInfo.country;
    this.userServices.updateUserInfo(user).subscribe(
      (userInformation: RegisteredUser) => {
        this.props.updateUserInfo(userInformation);
      }, error => {
        // Notify error
      }
    )
  }

  public render() {
    const {userInformation, onCloseModal} = this.state;
    console.log(userInformation.name);
    return (
      <FormWrapper
        onCloseModal={onCloseModal}
        displayName={userInformation.name}
        userName={userInformation.username}
        email={userInformation.email}
        firstName={userInformation.firstName}
        lastName={userInformation.lastName}
        bio={userInformation.bio}
        city={userInformation.city}
        country={userInformation.country}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
