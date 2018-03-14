import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';

import { Header } from './Header';
import { Section } from './Section';

export class Home extends Component {
  render() {
    return [<Header key={1} />, <Section key={2} />];
  }
}
