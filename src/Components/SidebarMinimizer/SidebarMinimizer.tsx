import * as React from 'react';
import { Component } from 'react';

export class SidebarMinimizer extends Component {
  public sidebarMinimize() {
    document.body.classList.toggle('sidebar-minimized');
  }

  public brandMinimize() {
    document.body.classList.toggle('brand-minimized');
  }

  public render() {
    return (
      <button
        className="sidebar-minimizer"
        type="button"
        onClick={event => {
          // tslint:disable-line
          this.sidebarMinimize();
          this.brandMinimize();
        }}
      />
    );
  }
}
