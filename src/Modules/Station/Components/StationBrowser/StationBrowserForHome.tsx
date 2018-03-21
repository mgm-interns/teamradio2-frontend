import { Component } from 'react';
import * as React from 'react';
import './StationBrowser.scss';
import { StationBrowserItemInfor } from '../../../Station';

export class StationBrowserForHome extends Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row text-center list-station">
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
          <div className="col-md">
            <StationBrowserItemInfor/>
          </div>
        </div>
      </div>
    );
  }
}