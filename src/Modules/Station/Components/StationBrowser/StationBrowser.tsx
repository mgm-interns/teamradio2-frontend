import { StationBrowserSlider } from 'Components/StationBrowserSlider';
import * as React from 'react';
import { Component } from 'react';
import './StationBrowser.scss';
import { IStationBrowserItem, StationBrowserItem } from './StationBrowserItem';

interface IStationBrowserStates {
  listStation: IStationBrowserItem[];
  stationBrowser: string;
  stationItemContainer: string;
}

export class StationBrowser extends Component<{}, IStationBrowserStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stationBrowser: 'station-browser',
      stationItemContainer: 'station-item-container',
      listStation: null,
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public getListStation() {
    const listStation = [];
    for (let i = 0; i < 30; i += 1) {
      const item: IStationBrowserItem = {
        stationName: 'Station ' + i,
        numberOfOnlineUsers: i,
        picture: '',
      };
      listStation.push(item);
    }
    this.setState({
      listStation,
    });
  }

  public render() {
    return (
      <div className="browser">
        <div className="cover-div">
          <StationBrowserSlider
            stationBrowser={this.state.stationBrowser}
            stationItemContainer={this.state.stationItemContainer}
          />
          <div className="list-station" id={this.state.stationBrowser}>
            <div
              className="station-item-container"
              id={this.state.stationItemContainer}>
              {this.state.listStation.map(
                (item: IStationBrowserItem, index: number) => {
                  return (
                    <StationBrowserItem
                      key={index}
                      numberOfOnlineUsers={item.numberOfOnlineUsers}
                      stationName={item.stationName}
                      picture={item.picture}
                    />
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
