import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import { IFormProps, IFormValues, InnerForm } from './InnerForm';

interface IProps {}

interface IState extends IFormProps {}

export class ForgotPasswordForm extends BaseComponent<IProps, IState> {
  @Inject('UserServices') private userServices: UserServices;
  private readonly initialValues: IFormValues;

  constructor(props: any) {
    super(props);

    this.initialValues = {
      email: '',
    };

    this.state = {
      success: false,
      serverError: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  public handleSubmit(values: IFormValues, formikActions: FormikActions<any>) {
    this.clearFormAlert();
    this.forgotPassword(values, formikActions);
  }

  public forgotPassword(
    values: IFormValues,
    formikActions: FormikActions<any>,
  ) {
    const { setSubmitting } = formikActions;
    this.userServices.forgotPassword(values).subscribe(
      (res: any) => {
        this.showFormAlerSuccess();
        setSubmitting(false);
      },
      (err: string) => {
        this.showError(err);
        this.showFormAlertError(err);
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
    const { required, validEmail } = Rules;
    const emailValidator = new Validator('Email', values.email, [
      required,
      validEmail,
    ]);
    errors.email = emailValidator.validate();
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
