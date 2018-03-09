import * as React from 'react';
import { Component } from 'react';
import { UserInfo } from "../UserInfo";
import './CustomHeader.scss';

export class CustomHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className="app-header">
        <div className="container">
          <div className="float-left">
            <div className="logo">
              <a href="/"><img alt="logo" src="img/logo.png"/></a>
              <span>Home</span>
            </div>
          </div>
          <div className="float-right">
            <span>Reputation: {20}</span>
            <UserInfo/>
          </div>
        </div>
      </header>
    );
  }
}
