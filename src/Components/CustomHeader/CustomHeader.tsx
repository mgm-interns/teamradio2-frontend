import * as React from 'react';
import { Component } from 'react';
import { UserInfo } from "../UserInfo";
import './CustomHeader.scss';

export class CustomHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event: any) {
      const element = event.target || event.srcElement;
      const { scrollTop } = element.documentElement;
      this.setState({
          transform: scrollTop,
      });
  }

  render() {
    const transformHeader = this.state.transform !==0 ? { filter: 'opacity(0.8)'} : null;
    return (
      <header className="app-header" style={transformHeader}>
        <div className="container">
          <div className="float-left">
            <div className="logo">
              <a href="/"><img alt="logo" src="img/logo.png"/></a>
            </div>
          </div>
          <div className="float-right">
            <span className="reputation">Reputation: {20}</span>
            <UserInfo/>
          </div>
        </div>
      </header>
    );
  }
}
