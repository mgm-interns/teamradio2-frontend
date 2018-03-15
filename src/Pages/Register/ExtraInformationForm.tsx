import { Component } from 'react';
import * as React from 'react';

export class ExtraInformationForm extends Component {
  render() {
    return (
      <div className="card-content">
        <h2>A registered user can:</h2>
        <ul>
          <li>
            <i className="icon-check"></i>
            <span>Edit profile</span>
          </li>
          <li>
            <i className="icon-check"></i>
            <span>Increase your reputation</span>
          </li>
          <li>
            <i className="icon-check"></i>
            <span>Play more songs than these anonymous freaks</span>
          </li>
          <li>
            <i className="icon-check"></i>
            <span>See some information of the past activities</span>
          </li>
        </ul>
      </div>
    );
  }
}