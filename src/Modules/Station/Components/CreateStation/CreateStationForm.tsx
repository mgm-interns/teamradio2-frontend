import { Component } from 'react';
import * as React from 'react';
import './CreateStationFormWraper.scss';
import { FormWrapper, IStationFormValues } from './CreateStationFormWraper';

export class CreateStationForm extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(formValues: IStationFormValues) {
    console.log(formValues);
  }

  public render() {
    return <FormWrapper handleSubmit={this.handleSubmit}/>;
  }
}
