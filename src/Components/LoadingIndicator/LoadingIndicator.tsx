import * as React from 'react';
import { Component } from 'react';
import './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="loader"></div>
    )

  }

}
