import * as React from 'react';
import { Component } from 'react';
import { StationBrowserForHome } from '../../Modules/Station';
import { Main } from './Main';
import { Sections } from './Sections';

export class Home extends Component {
  public render() {
    return [<Main key={1}/>, <StationBrowserForHome key={2}/>, <Sections key={3}/>];
  }
}
