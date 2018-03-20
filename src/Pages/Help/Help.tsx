import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Component } from "react";

import Resource from './HelpResource';
import './Help.scss';

export class Help extends Component {
  coverImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUZbD4KRNnATuFo0ZqOOmAU6ecExSjSLxxzDlnTrHgNQs6bvl';
  render() {
    return (
      <div className="help-container">
        <img src={this.coverImg} className="help-container_cover-image"/>
        <div className="help-container_content">
          <ReactMarkdown source={Resource.score}/>
        </div>
      </div>
    )
  }
}