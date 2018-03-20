import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Component } from "react";

import Resource from './HelpResource';
import './Help.scss';

export class Help extends Component {
  render() {
    return (
      <div className="help-container">
        <img src="img/help-page/cover.jpg" className="help-container_cover-image"/>
        <div className="help-container_content">
          <ReactMarkdown source={Resource.score}/>
        </div>
      </div>
    )
  }
}