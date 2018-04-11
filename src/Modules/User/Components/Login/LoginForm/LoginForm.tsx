import { FormikErrors, Formik, FormikActions } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { UserServices } from "Services/Http";
import { FormValues, InnerForm, IFormProps } from './InnerForm';
import { UnauthorizedUser } from "Models/User";
import { localStorageManager } from "Helpers/LocalStorageManager";

interface IState extends IFormProps {} // tslint:disable-line

interface IProps {} // tslint:disable-line

export class LoginForm extends Component<IProps, IState> {
  private initialValues: FormValues;
  private userServices: UserServices;

  constructor(props: IProps) {
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

  handleSubmit(values: FormValues, { setSubmitting, resetForm }: FormikActions<any>) {
    this.clearFormAlert();
    const { username, password } = values;
    const userObj = new UnauthorizedUser(username, password);
    const user = userObj.encode(userObj);

    this.userServices.login(user).subscribe(
      (res: any) => {
        localStorageManager.setAccessToken(res.access_token);
        this.showFormAlerSuccess();
        setSubmitting(false);
        resetForm();
      },
      (err: any) => {
        console.log(err);
        this.showFormAlertError(err);
        setSubmitting(false);
      },
    );
  }

  validate(values: FormValues) {
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
        render={formikProps => <InnerForm {...formikProps} success={success} serverError={serverError}/>}
        validate={this.validate}
      />
    );
  }
}
