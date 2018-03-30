import * as React from 'react';
import { Component } from 'react';
import { UserInfo } from '../UserInfo';
import './CustomHeader.scss';

export class CustomHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const accessToken = localStorage.getItem('accessToken');
    accessToken
      ? this.setState({
          login: true,
        })
      : this.setState({
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
      this.state.transform !== 0 ? { filter: 'opacity(0.8)' } : null;

    return (
      <header className="app-header" style={transformHeader}>
        <div className="container">
          <div className="float-left">
            <div className="logo">
              <a href="/">
                <img alt="logo" src="img/logo.png" />
              </a>
            </div>
          </div>
          {this.state.login ? (
            <div className="float-right">
              <span className="reputation">Reputation: {20}</span>
              <UserInfo />
            </div>
          ) : (
            <div className="float-right">
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
