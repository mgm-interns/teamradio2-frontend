import * as React from 'react';
import { Component } from 'react';
import { StationBrowser } from "../../Modules/Station/Components/StationBrowser";
import { Main } from './Main';
import { Sections } from './Sections';

export class Home extends Component {
  public render() {
    return [<Main key={1}/>, <StationBrowser key={2}/>, <Sections key={3}/>];
  }
}
