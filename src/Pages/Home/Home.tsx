import * as React from 'react';
import { Component } from 'react';

import { Main } from './Main';
import { Sections } from './Sections';
import { StationBrowserForHome } from '../../Modules/Station';


export class Home extends Component {
  render() {
    return [<Main key={1}/>, <StationBrowserForHome key={2}/>, <Sections key={3}/>];
  }
}
