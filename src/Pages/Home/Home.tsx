import * as React from 'react';
import { Component } from 'react';

import { Main } from './Main';
import { Sections } from './Sections';

export class Home extends Component {
  public render() {
    return [<Main key={1} />, <Sections key={2} />];
  }
}
