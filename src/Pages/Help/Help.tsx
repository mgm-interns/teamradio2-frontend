import * as React from 'react';
import { Component } from 'react';
import * as ReactMarkdown from 'react-markdown';

import './Help.scss';
import Resource from './HelpResource';

export class Help extends Component {
  public render() {
    return (
      <div className="help-container">
        <img
          src="img/help-page/cover.jpg"
          className="help-container_cover-image"
        />
        <div className="help-container_content">
          <ReactMarkdown source={Resource.score} />
        </div>
      </div>
    );
  }
}
