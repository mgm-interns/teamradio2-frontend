import * as React from 'react';
import { Component } from 'react';
import { UserInfo } from '../UserInfo';
import './CustomHeader.scss';
import { localStorageManager } from "Helpers/LocalStorageManager";

const HEADER_MARGIN: number = 200;

export class CustomHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const accessToken = localStorageManager.getAccessToken();
    accessToken
      ? this.setState({
          login: true,
        })
      : this.setState({
          login: false,
        });
  }

  signOut() {
    localStorageManager.removeAccessToken();
    this.setState({
      login: false,
    });
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  public handleScroll(event: any) {
    const element = event.target || event.srcElement;
    const { scrollTop } = element.documentElement;
    this.setState({
      transform: scrollTop,
    });
  }

  public render() {
    const transformHeader =
      this.state.transform > HEADER_MARGIN ? { filter: 'opacity(0.8)' } : null;

    return (
      <header className="app-header" style={transformHeader}>
        <div className="container">
          <div className="header-left">
            <div className="logo">
              <a href="/">
                <img alt="logo" src="/img/logo.png"/>
              </a>
            </div>
          </div>
          {this.state.login ? (
            <div className="header-right">
              <UserInfo signOut={this.signOut} />
            </div>
          ) : (
            <div className="header-right">
              <a href="/login" className="login-register-button">
                Login
              </a>
              <a href="/register" className="login-register-button">
                Register
              </a>
            </div>
          )}
        </div>
      </header>
    );
  }
}
