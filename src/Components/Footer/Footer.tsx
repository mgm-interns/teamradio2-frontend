import * as React from 'react';
import { Component } from 'react';
import './Footer.scss';

export class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div className="container">
            <span className="float-left">Copyright 2018 &copy; <span>Team-Radio</span> . All rights reversed.</span>
            <span className="ml-auto float-right">Powered by <a href="https://www.mgm-tp.com/">mgm technology partners Vietnam</a></span>
        </div>
      </footer>
    )
  }
}
