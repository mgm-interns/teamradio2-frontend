import { Component } from 'react';
import * as React from 'react';
import './StationBrowser.scss';
import { StationBrowserItemInfo } from '../../../Station';
import { ArrowButton } from "../../../../Components/ArrowButton";

export class StationBrowserForHome extends Component {
  render() {
    return (
      <div className="container-fluid text-center browser">
          <div className="cover-div">
			  <ArrowButton />


        <div className="text-center list-station">

          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 1
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 2
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 3
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 4
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 5
            </div>
          </div>
          <div className=" station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 6
            </div>
          </div>
          <div className=" station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 7
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 8
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 9
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 10
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 11
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 12
            </div>
          </div>
          <div className="station-item">
            <div className="row">
              <StationBrowserItemInfo/>
            </div>
            <div className="row station-name">
              Station 13
            </div>
          </div>
		</div>
		</div>
      </div>
    );
  }
}