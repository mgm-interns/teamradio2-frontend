import { Component } from 'react';
import * as React from 'react';
import './CreateStation.scss';
import { CreateStationForm } from './CreateStationForm';

interface IProps {
  history?: object;
}

interface IState {
  stationName: string;
  isPrivate: false;
}

export class CreateStation extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      stationName: '',
      isPrivate: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentWillReceiveProps(nextProps: any) {
    // const { history } = this.props;

    // redirect to the created station page
  }

  public handleSubmit(text: string) {
    this.setState({stationName: text})
  }

  public render() {
    return (
      <div className="header__create-box">
        <CreateStationForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
