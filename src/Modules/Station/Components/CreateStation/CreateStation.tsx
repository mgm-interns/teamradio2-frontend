import { Field, Form, Formik, FormikErrors, FormikProps } from 'formik';
import { Rules, Validator } from 'Helpers';
import { Station } from 'Models/Station';
import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, FormFeedback, FormGroup, InputGroup } from 'reactstrap';
import { StationServices } from 'Services/Http';
import './CreateStation.scss';

interface IStationFormValues {
  name: string;
  serverError?: string;
  error: number;
}

interface IFormProps {
  initialStationName?: string;
  handleSubmit: any;
  serverError?: string;
}

const InnerForm = (props: FormikProps<IStationFormValues> & IFormProps) => {
  const { touched, errors, handleSubmit, serverError } = props;

  return (
    <Form onSubmit={handleSubmit} className="form-wrapper">
      <FormGroup className="input-wrapper">
        <InputGroup>
          <Field
            type="text"
            name="name"
            className="transparent-form-control"
            placeholder="Your team station"
          />
        </InputGroup>

        <Button color="success" block className="button-submit">
          <i className="fa fa-paper-plane-o input--fa" />
        </Button>
      </FormGroup>

      {((touched.name && errors.name) || serverError) && (
        <FormFeedback className="text-error">
          {errors.name || serverError}
        </FormFeedback>
      )}
    </Form>
  );
};

class CreateStationForm extends Component<RouteComponentProps<any>, any> {
  private stationServices: StationServices;
  private initialValues: any;

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.stationServices = new StationServices();

    this.state = {
      error: '',
    };

    this.initialValues = {
      name: '',
      error: '',
    };
  }

  public componentWillUnmount() {
    this.setState({ error: '', name: '' });
  }

  public validate(values: any) {
    const errors: FormikErrors<any> = {};
    const { required, validStationName } = Rules;
    const stationNameValidator = new Validator('Station name', values.name, [
      required,
      validStationName,
    ]);

    errors.name = stationNameValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  public handleSubmit = (formValues: IStationFormValues) => {
    const name = formValues.name;
    this.stationServices.createStation(name).subscribe(
      (res: Station) => {
        this.props.history.push(`/station/${res.id}`);
      },
      (err: any) => {
        this.setState({ error: err || 'Something went wrong!' });
      },
    );
  };

  public render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => (
          <InnerForm {...formikProps} serverError={this.state.error} />
        )}
        validate={this.validate}
      />
    );
  }
}

export const CreateStation = withRouter(CreateStationForm);
