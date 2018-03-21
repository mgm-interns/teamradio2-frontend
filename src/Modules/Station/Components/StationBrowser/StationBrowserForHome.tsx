import { Component } from 'react';
import * as React from 'react';
import './StationBrowser.scss';
import { StationBrowserItemInfor } from '../../../Station';

export class StationBrowserForHome extends Component {
  render() {
    return (
      <div className="container-fluid text-center browser">
        <div className="text-center list-station">
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className=" station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className=" station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfor/>
            </div>
            <div className="row station-name">
              StationName
            </div>
          </div>
        </div>
      </div>
    );
  }
}