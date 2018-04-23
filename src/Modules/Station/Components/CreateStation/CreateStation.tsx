import { BaseComponent } from 'BaseComponent';
import { Field, Form, Formik, FormikErrors, FormikProps } from 'formik';
import { Rules, Validator } from 'Helpers';
import { Station } from 'Models';
import * as React from 'react';
import { FormEvent } from 'react';
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
import {
  STATION_PRIVACY_PRIVATE,
  STATION_PRIVACY_PUBLIC,
} from '../../Constants';
import './CreateStation.scss';

interface IStationFormValues {
  name: string;
  privacy: boolean;
  serverError?: string;
}

interface IFormProps {
  initialStationName?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
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

      {(touched.name || errors.name || serverError) && (
        <FormFeedback className="text-error">
          {errors.name || serverError}
        </FormFeedback>
      )}

      <div
        className={
          errors.name
            ? 'toggle-container-with-error'
            : 'toggle-container-without-error'
        }>
        <Label className="switch switch-3d switch-primary">
          <Input
            name="privacy"
            type="checkbox"
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
  private stationServices: StationServices;
  private readonly initialValues: any;

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.stationServices = new StationServices();

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
    const stationPrivacy = formValues.privacy
      ? STATION_PRIVACY_PRIVATE
      : STATION_PRIVACY_PUBLIC;
    this.stationServices.createStation(name, stationPrivacy).subscribe(
      (res: Station) => {
        this.props.history.push(`/station/${res.id}`);
      },
      (err: any) => {
        if (err) {
          this.setState({ error: err });
        } else {
          this.showError('Something went wrong!');
        }
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
