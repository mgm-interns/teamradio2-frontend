import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';

interface IFormValues {
  stationName: string;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} className="form-root">
      <FormGroup>
        <InputGroup>
          <Field
            type="text"
            name="stationName"
            className="transparent-form-control"
            placeholder="Your team station"
          />
        </InputGroup>
      </FormGroup>

      <Button color="success" block disabled={isSubmitting}>
        Submit
      </Button>

      {touched.stationName &&
        errors.stationName && (
          <FormFeedback className="text-error">
            {errors.stationName}
          </FormFeedback>
        )}
    </Form>
  );
};

// The type of props FormWrapper receives
interface IFormProps {
  initialStationName?: string;
  handleSubmit: any;
}

const FormWrapper = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      stationName: props.initialStationName || '',
    };
  },

  validate: (values: IFormValues) => {
    const errors: FormikErrors<any> = {};
    const { validStationName } = Rules;
    const stationNameValidator = new Validator('Email', values.stationName, [
      validStationName,
    ]);
    errors.stationName = stationNameValidator.validate();
    return Validator.removeUndefinedError(errors);
  },

  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);

export class CreateStationForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { handleSubmit } = this.props;
    return <FormWrapper handleSubmit={handleSubmit} />;
  }
}
