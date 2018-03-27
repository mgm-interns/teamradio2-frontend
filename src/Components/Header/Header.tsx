import * as React from 'react';
import { Component } from 'react';
import { NavbarBrand, NavbarToggler } from 'reactstrap';

export class Header extends Component {
  public sidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  public sidebarMinimize(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  public mobileSidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  public asideToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  public render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler
          className="d-md-down-none mr-auto"
          onClick={this.sidebarToggle}
        >
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
      </header>
    );
  }
}
