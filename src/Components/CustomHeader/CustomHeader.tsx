import { UserDropdown } from 'Modules/User';
import * as React from 'react';
import { Component } from 'react';
import './CustomHeader.scss';

const HEADER_MARGIN: number = 200;

export class CustomHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
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
                <img alt="logo" src="/img/logo.png" />
              </a>
            </div>
          </div>
          <div className="header-right">
            <UserDropdown />
          </div>
        </div>
      </header>
    );
  }
}
