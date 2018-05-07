import { BaseComponent } from 'BaseComponent';
import { inject } from 'Configuration/DI';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { UserServices } from 'Services/Http';
import { IFormProps, IFormValues, InnerForm } from './InnerForm';

interface IState extends IFormProps {}
interface IProps {}

export class ResetPasswordFormComponent extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  @inject('UserServices') private userServices: UserServices;
  private readonly initialValues: IFormValues;

  constructor(props: any) {
    super(props);

    this.initialValues = {
      password: '',
      confirmPassword: '',
    };

    this.state = {
      success: false,
      serverError: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(values: IFormValues, formikActions: FormikActions<any>) {
    this.clearFormAlert();
    const { password } = values;
    this.resetPassword(password, formikActions);
  }

  public resetPassword(password: string, formikActions: FormikActions<any>) {
    const { setSubmitting, resetForm } = formikActions;
    const { match } = this.props;
    const token = match.params.token;

    this.userServices.resetPassword(password, token).subscribe(
      (res: any) => {
        if (res.success) {
          this.showFormAlerSuccess();
        }
        setSubmitting(false);
      },
      (err: any) => {
        console.log(err);
        this.showFormAlertError(err);
        resetForm();
        setSubmitting(false);
      },
    );
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

  public validate(values: IFormValues) {
    const errors: FormikErrors<any> = {};
    const { password, confirmPassword } = values;
    const { required, minLength6, matchPassword } = Rules;

    const passwordValidator = new Validator('Password', password, [
      required,
      minLength6,
    ]);
    const confirmPasswordValidator = new Validator(
      'Confirm password',
      confirmPassword,
      [required, matchPassword(password)],
    );

    errors.password = passwordValidator.validate();
    errors.confirmPassword = confirmPasswordValidator.validate();

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

export const ResetPasswordForm = withRouter(ResetPasswordFormComponent);
