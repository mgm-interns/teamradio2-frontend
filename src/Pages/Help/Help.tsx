import * as React from 'react';
import { Component } from 'react';
import * as ReactMarkdown from 'react-markdown';

import './Help.scss';
import Resource from './HelpResource';

export class Help extends Component {
  public render() {
    return (
      <div className="help-container">
        <div className="cover" />
        <div className="content">
          <ReactMarkdown source={Resource.score} />
        </div>
      </div>
    );
  }
}
