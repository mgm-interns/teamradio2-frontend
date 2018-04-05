import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Rules, Validator } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';
import './CreateStation.scss';

interface IFormValues {
  stationName: string;
}

interface IProps {
  history?: object;
}

interface IState {
  stationName: string;
  isPrivate: false;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} className="form-wrapper">
      <FormGroup className="input-wrapper">
          <InputGroup>
            <Field
              type="text"
              name="stationName"
              className="transparent-form-control"
              placeholder="Your team station"
            />
          </InputGroup>

        <Button color="success" block disabled={isSubmitting} className="button-submit">
          <i className="fa fa-paper-plane-o input--fa" />
        </Button>
      </FormGroup>

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

export class CreateStation extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      stationName: '',
      isPrivate: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(text: string) {
    this.setState({stationName: text})
  }

  public render() {
    console.log(this.state.stationName);
    return <FormWrapper handleSubmit={this.handleSubmit} />;
  }
}
