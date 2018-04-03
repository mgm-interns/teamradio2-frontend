import * as React from 'react';
import { Component } from 'react';
import { StationBrowserSlider } from "../../../../Components/StationBrowserSlider";
import { StationBrowserItem } from '../../../Station';
import './StationBrowser.scss';

interface IStationBrowserStates {
  listStation: any
  stationBrowser: string,
  stationItemContainer: string
}

export class StationBrowser extends Component <{}, IStationBrowserStates> {

  constructor(props: {}) {
    super(props);
    this.state = {
      stationBrowser: 'station-browser',
      stationItemContainer: 'station-item-container',
      listStation: null
    };
  }

  public componentWillMount() {
    const listStation = [];
    for (let i = 0; i < 30; i += 1) {
      listStation.push(
        <div className="station-item" key={i}>
          <div className="row">
            <StationBrowserItem numberOfOnlineUsers={i}/>
          </div>
          <div className="row station-name">
            Station {i}
          </div>
        </div>
      );
      this.setState({
        listStation
      });
    }
  }

  public render() {
    return (
      <div className="container-fluid browser">
        <div className="cover-div">
          <StationBrowserSlider stationBrowser={this.state.stationBrowser}
                                stationItemContainer={this.state.stationItemContainer}/>
          <div className="list-station" id={this.state.stationBrowser}>
            <div className="station-item-container" id={this.state.stationItemContainer}>
              {this.state.listStation}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
