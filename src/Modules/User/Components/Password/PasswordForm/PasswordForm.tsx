import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjector';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import { IFormProps, IFormValues, InnerForm } from './InnerForm';
import './PasswordForm.scss';

interface IState extends IFormProps {}

interface IProps {
  onCloseModal: any;
  hadPass?: boolean;
}

export class PasswordForm extends BaseComponent<IProps, IState> {
  @Inject('UserServices') private userServices: UserServices;
  private readonly initialValues: IFormValues;

  constructor(props: IProps) {
    super(props);

    this.initialValues = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      success: false,
      serverError: '',
    };
  }

  public handleSubmit(values: IFormValues, formikActions: FormikActions<any>) {
    this.clearFormAlert();
    const { currentPassword, newPassword } = values;
    this.changePassword(currentPassword, newPassword, formikActions);
  }

  public changePassword(
    currentPassword: string,
    newPassword: string,
    formikActions: FormikActions<any>,
  ) {
    const old_password = currentPassword;
    const new_password = newPassword;
    const { setSubmitting, resetForm } = formikActions;

    this.userServices.changePassword({ old_password, new_password }).subscribe(
      (res: any) => {
        this.showFormAlerSuccess();
        this.showSuccess('Password is changed successfully.');
        setSubmitting(false);
        resetForm();
        this.props.onCloseModal();
      },
      (err: string) => {
        setSubmitting(false);
        this.showFormAlertError(err);
        this.showError(err);
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
    const { currentPassword, newPassword, confirmPassword } = values;
    const { required, minLength6, matchPassword } = Rules;

    if (this.props.hadPass) {
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
  }

  public render() {
    const { onCloseModal, hadPass } = this.props;
    const { serverError, success } = this.state;
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        validate={this.validate}
        render={formikProps => (
          <InnerForm
            {...formikProps}
            onCloseModal={onCloseModal}
            hadPass={hadPass}
            serverError={serverError}
            success={success}
          />
        )}
      />
    );
  }
}
