import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Field, Form, Formik, FormikErrors, FormikProps } from 'formik';
import { Rules, Validator } from 'Helpers';
import { Station, StationPrivacy } from 'Models';
import { FormEvent } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from 'reactstrap';
import { StationServices } from 'Services/Http';
import './CreateStation.scss';

interface IStationFormValues {
  name: string;
  privacy: StationPrivacy;
  serverError?: string;
}

interface IFormProps {
  initialStationName?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const InnerForm = (props: FormikProps<IStationFormValues> & IFormProps) => {
  const { touched, errors, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} className="form-wrapper" autoComplete="off">
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

      {touched.name &&
        errors.name && (
          <FormFeedback className="text-error">{errors.name}</FormFeedback>
        )}

      <div
        className={
          touched.name && errors.name
            ? 'toggle-container-with-error'
            : 'toggle-container-without-error'
        }>
        <Label className="switch switch-3d switch-primary">
          <Input
            name="privacy"
            type="checkbox"
            className="switch-input"
            onChange={event => {
              props.setFieldValue('privacy', event.target.checked);
            }}
          />
          <span className="switch-label" />
          <span className="switch-handle" />
        </Label>
        <span className="toggle-text">Private station</span>
      </div>
    </Form>
  );
};

class CreateStationForm extends BaseComponent<RouteComponentProps<any>, any> {
  public static validate(values: any) {
    const errors: FormikErrors<any> = {};
    const { required, validStationName } = Rules;
    const stationNameValidator = new Validator('Station name', values.name, [
      required,
      validStationName,
    ]);

    errors.name = stationNameValidator.validate();

    return Validator.removeUndefinedError(errors);
  }

  @Inject('StationServices') private stationServices: StationServices;
  private readonly initialValues: any;

  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {
      error: '',
    };

    this.initialValues = {
      name: '',
      privacy: false,
      error: '',
    };
  }

  public componentWillUnmount() {
    this.setState({ error: '', name: '' });
  }

  public handleSubmit = (formValues: IStationFormValues) => {
    const name = formValues.name;
    const stationPrivacy = formValues.privacy
      ? StationPrivacy.STATION_PRIVATE
      : StationPrivacy.STATION_PUBLIC;
    this.stationServices.createStation(name, stationPrivacy).subscribe(
      (station: Station) => {
        this.props.history.push(`/station/${station.friendlyId}`);
      },
      (err: any) => {
        this.setState({ error: err });
        this.showError(err);
      },
    );
  };

  public render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={formikProps => <InnerForm {...formikProps} />}
        validate={CreateStationForm.validate}
      />
    );
  }
}

export const CreateStation = withRouter(CreateStationForm);
