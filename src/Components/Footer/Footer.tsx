import * as React from 'react';
import { Component } from 'react';
import './Footer.scss';

export class Footer extends Component {
  public render() {
    return (
      <footer className="app-footer">
        <div className="container">
          <span className="float-left">
            Copyright 2018 &copy; <a href="https://www.mgm-tp.com/">mgm</a>. All
            rights reversed.
          </span>
        </div>
      </footer>
    );
  }
}
