import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

interface IFormValues {
  email: string;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormGroup>
        <InputGroup>
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="Your email"
          />
          {touched.email &&
            errors.email && <FormFeedback>{errors.email}</FormFeedback>}
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

// The type of props FormWrapper receives
interface IFormProps {
  initialEmail?: string;
}

const FormWrapper = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
    };
  },

  validate: (values: IFormValues) => {
    const errors: FormikErrors<any> = {};
    const { required, validEmail } = Rules;
    const emailValidator = new Validator('Email', values.email, [
      required,
      validEmail,
    ]);
    errors.email = emailValidator.validate();
    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);

export class ForgotPasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <FormWrapper />;
  }
}
