import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap';
import { Main } from './Main';
import { Sections } from './Sections';

export class Home extends Component {
  public render() {
    return [
      <Main key={1} />,
      <Container key={2}>
        <StationBrowser />
      </Container>,
      <Sections key={3} />,
    ];
  }
}
