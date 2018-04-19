import { BaseComponent } from 'BaseComponent';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { localStorageManager, Rules, Validator } from 'Helpers';
import { AccessToken, UnauthorizedUser } from 'Models';
import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { UserServices } from 'Services/Http';
import { FormValues, IFormProps, InnerForm } from './InnerForm';

interface IState extends IFormProps {}

interface IProps {}

export class LoginFormComponent extends BaseComponent<
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
            // WARN: There is be no notification bubble if redirect by this way
            this.showSuccess('Successfully login!');
            // this.props.history.push('/');
            // TODO: Update user info on header instead of redirecting
            window.location.href = '/';
          },
          err => {
            console.log(err);
          },
        );
      },
      (err: any) => {
        console.error(err);
        this.showFormAlertError(err);
        setSubmitting(false);
        this.showError('Something went wrong!');
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

export const LoginForm = withRouter(LoginFormComponent);
