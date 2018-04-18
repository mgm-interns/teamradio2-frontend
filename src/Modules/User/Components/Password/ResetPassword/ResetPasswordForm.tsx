import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup className="mb-3">
          <Field
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          {touched.password &&
            errors.password && <FormFeedback>{errors.password}</FormFeedback>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Field
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
          {touched.confirmPassword &&
            errors.confirmPassword && (
              <FormFeedback>{errors.confirmPassword}</FormFeedback>
            )}
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

const FormWrapper = withFormik<any, IFormValues>({
  mapPropsToValues: props => {
    return {
      password: '',
      confirmPassword: '',
    };
  },

  validate: (values: IFormValues) => {
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
  },

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);

export class ResetPasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <FormWrapper />;
  }
}
