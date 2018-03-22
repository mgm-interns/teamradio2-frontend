import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap';
import { StationBrowserSlider } from "../../../../Components/StationBrowserSlider";
import { StationBrowserItemInfo } from '../../../Station';
import './StationBrowser.scss';

interface IStationBrowserForHomeStates {
  stationBrowser: string,
  stationItemContainer: string
}

export class StationBrowserForHome extends Component <{}, IStationBrowserForHomeStates> {

  constructor(props: {}) {
    super(props);
    this.state = {
      stationBrowser: 'station-browser',
      stationItemContainer: 'station-item-container'
    };
  }

  public render() {
    return (
      <Container className="browser">
        <div className="cover-div">
          <StationBrowserSlider stationBrowser={this.state.stationBrowser}
                                stationItemContainer={this.state.stationItemContainer}/>
          <div className="list-station" id={this.state.stationBrowser}>
            <div className="station-item-container" id={this.state.stationItemContainer}>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={1}/>
                </div>
                <div className="row station-name">
                  Station 1
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={2}/>
                </div>
                <div className="row station-name">
                  Station 2
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={3}/>
                </div>
                <div className="row station-name">
                  Station 3
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 4
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 5
                </div>
              </div>
              <div className=" station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 6
                </div>
              </div>
              <div className=" station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 7
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 8
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 9
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 10
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 11
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 12
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 13
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 14
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 15
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 16
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 17
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 18
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 19
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 20
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 21
                </div>
              </div>
              <div className="station-item">
                <div className="row">
                  <StationBrowserItemInfo numberOfOnlineUsers={0}/>
                </div>
                <div className="row station-name">
                  Station 22
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
