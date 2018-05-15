import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap';
import { Main } from './Main';
import { Sections } from './Sections';

export class Home extends Component {
  private static scrollTop() {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
  }

  public UNSAFE_componentWillReceiveProps() {
    Home.scrollTop();
  }

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
