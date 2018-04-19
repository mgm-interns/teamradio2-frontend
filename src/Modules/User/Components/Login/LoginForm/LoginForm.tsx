import { Formik, FormikActions, FormikErrors } from 'formik';
import { localStorageManager, Rules, Validator } from 'Helpers';
import { AccessToken, RegisteredUser, UnauthorizedUser } from 'Models';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { UserServices } from 'Services/Http';
import { updateUserInfo } from '../../../Redux/Actions';
import { FormValues, IFormProps, InnerForm } from './InnerForm';

interface IState extends IFormProps {}

interface IProps {
  updateUserInfo?: (user: RegisteredUser) => void;
}

export class LoginFormComponent extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  private readonly initialValues: FormValues;
  private userServices: UserServices;

  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.initialValues = {
      username: '',
      password: '',
    };

    this.state = {
      success: false,
      serverError: '',
    };

    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  public showFormAlertError(err: string) {
    this.setState({
      serverError: err,
    });
  }

  public showFormAlerSuccess() {
    this.setState({ success: true });
  }

  public clearFormAlert() {
    this.setState({
      serverError: '',
      success: false,
    });
  }

  public goBack() {
    if (window.history.length > 2) {
      this.props.history.go(-1);
    } else {
      this.props.history.replace('/');
    }
  }

  public handleSubmit(
    values: FormValues,
    { setSubmitting, resetForm }: FormikActions<any>,
  ) {
    this.clearFormAlert();
    const { username, password } = values;
    const user = new UnauthorizedUser(username, password);

    this.userServices.login(user).subscribe(
      (accessToken: AccessToken) => {
        this.showFormAlerSuccess();
        setSubmitting(false);
        resetForm();
        this.userServices.getCurrentUserProfile().subscribe(
          userInfo => {
            localStorageManager.setUserInfo(userInfo);
            this.props.updateUserInfo(userInfo);
            this.goBack();
          },
          err => {
            console.log(err);
          },
        );
      },
      (err: any) => {
        console.log(err);
        this.showFormAlertError(err);
        setSubmitting(false);
      },
    );
  }

  public validate(values: FormValues) {
    const errors: FormikErrors<any> = {};
    const { username, password } = values;
    const { required } = Rules;
    const usernameValidator = new Validator('Username or Email', username, [
      required,
    ]);
    const passwordValidator = new Validator('Password', password, [required]);

    errors.username = usernameValidator.validate();
    errors.password = passwordValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  public render() {
    const { success, serverError } = this.state;
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => (
          <InnerForm
            {...formikProps}
            success={success}
            serverError={serverError}
          />
        )}
        validate={this.validate}
      />
    );
  }
}

const LoginFormWithRouter = withRouter(LoginFormComponent);

const mapDispatchToProps = (dispatch: any) => ({
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const LoginForm = connect<{}, {}, IProps>(null, mapDispatchToProps)(
  LoginFormWithRouter,
);
