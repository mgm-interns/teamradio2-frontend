import * as React from 'react';
import { Component } from 'react';
import './LoadingIndicator.scss';

export class LoadingIndicator extends Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <div className="loader" />;
  }
}
