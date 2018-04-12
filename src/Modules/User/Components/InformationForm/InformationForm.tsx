import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import { UserServices } from 'Services/Http';
import { RegisteredUser } from '../../../../Models/User';
import { updateUserInfo } from '../../../Station/Redux/Actions';
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
              placeholder="Enter your username"
            />
            {touched.username &&
              errors.username && <FormFeedback>{errors.username}</FormFeedback>}
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

const FormWrapper = withFormik<IFormProps, IFormValues>({
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
    const { name, username } = values;
    const { required } = Rules;

    const nameValidator = new Validator('Display Name', name, [required]);
    const usernameValidator = new Validator('RegisteredUser name', username, [
      required,
    ]);

    errors.name = nameValidator.validate();
    errors.username = usernameValidator.validate();

    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (userInfo, informationForm) => {
    informationForm.props.handleSubmit(userInfo);
    userInfo.onCloseModal();
  },
})(InnerForm);

interface IInformationFormProps {
  onCloseModal: () => void;
  updateUserInfoRequest?: (userInfoUpdated: RegisteredUser) => void;
}

interface IInformationFormStates {
  userInfo: RegisteredUser;
  isLoadingUserInfo: boolean;
}

export class InformationForms extends Component<
  IInformationFormProps,
  IInformationFormStates
> {
  private readonly userServices: UserServices;

  constructor(props: IInformationFormProps) {
    super(props);
    this.state = {
      userInfo: null,
      isLoadingUserInfo: false,
    };
    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async componentWillMount() {
    this.setState({
      isLoadingUserInfo: true,
    });
    await this.getUserProfile().then((userInfo: RegisteredUser) => {
      this.setState({
        userInfo,
        isLoadingUserInfo: false,
      });
    });
  }

  public getUserProfile() {
    return new Promise(async (resolve, reject) => {
      this.userServices.getCurrentUserProfile().subscribe(
        (userInfo: RegisteredUser) => {
          resolve(userInfo);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  public handleSubmit(userInfo: IFormProps) {
    const { updateUserInfoRequest } = this.props;
    const newUserInfo = this.state.userInfo;
    newUserInfo.name = userInfo.name;
    newUserInfo.username = userInfo.username;
    newUserInfo.email = userInfo.email;
    newUserInfo.firstName = userInfo.firstName;
    newUserInfo.lastName = userInfo.lastName;
    newUserInfo.bio = userInfo.bio;
    newUserInfo.city = userInfo.city;
    newUserInfo.country = userInfo.country;
    this.userServices.updateUserInfo(newUserInfo).subscribe(
      (userInfoUpdated: RegisteredUser) => {
        updateUserInfoRequest(userInfoUpdated);
      },
      error => {
        // Notify error
      },
    );
  }

  public render() {
    const { onCloseModal } = this.props;
    if (!this.state.isLoadingUserInfo) {
      const { userInfo } = this.state;
      return (
        <FormWrapper
          onCloseModal={onCloseModal}
          {...userInfo}
          handleSubmit={this.handleSubmit}
        />
      );
    }
    return <div />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateUserInfoRequest: (userInfoUpdated: RegisteredUser) =>
    dispatch(updateUserInfo(userInfoUpdated)),
});

export const InformationForm = connect<{}, {}, IInformationFormProps>(
  null,
  mapDispatchToProps,
)(InformationForms);
