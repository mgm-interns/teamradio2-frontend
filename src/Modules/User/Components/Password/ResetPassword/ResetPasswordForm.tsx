import { BaseComponent } from 'BaseComponent';
import { Formik, FormikActions, FormikErrors } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import { IFormProps, IFormValues, InnerForm } from './InnerForm';

interface IState extends IFormProps {}
interface IProps {}

export class ResetPasswordForm extends BaseComponent<IProps, IState> {
  private userServices: UserServices;
  private readonly initialValues: IFormValues;

  constructor(props: any) {
    super(props);

    this.initialValues = {
      password: '',
      confirmPassword: '',
    };

    this.userServices = new UserServices();
  }

  public handleSubmit(values: IFormValues, formikActions: FormikActions<any>) {
    console.log(values);
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
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => (
          <InnerForm
            {...formikProps}
          />
        )}
        validate={this.validate}
      />
    );
  }
}
