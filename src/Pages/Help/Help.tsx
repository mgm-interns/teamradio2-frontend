import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Component } from "react";

import Resource from './HelpResource';

export class Help extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <ReactMarkdown source={Resource.general} />
        <ReactMarkdown source={Resource.score} />
      </div>
    )
  }
}