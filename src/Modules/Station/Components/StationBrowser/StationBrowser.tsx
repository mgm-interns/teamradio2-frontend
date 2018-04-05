import { StationBrowserSlider } from 'Components/StationBrowserSlider';
import { Station } from "Models/Station";
import * as React from 'react';
import { Component } from 'react';
import { StationServices } from 'Services/Http';
import './StationBrowser.scss';
import { IStationBrowserItem, StationBrowserItem } from './StationBrowserItem';

interface IStationBrowserStates {
  listStation: IStationBrowserItem[];
  stationBrowser: string;
  stationItemContainer: string;
}

export class StationBrowser extends Component<{}, IStationBrowserStates> {
  private stationServices: StationServices;
  constructor(props: {}) {
    super(props);
    this.stationServices = new StationServices();
    this.state = {
      stationBrowser: 'station-browser',
      stationItemContainer: 'station-item-container',
      listStation: [],
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public stationModelToStationView(res : Station[]) {
    return res.map((item: Station) => {
      return {
        stationName: item.name,
        numberOfOnlineUsers: 0,
        picture: ''
      }
    });
  }
  public getListStation() {
    this.stationServices.getListStation().subscribe(
      (res: Station[]) => {
        console.log(res);
        const listStation = this.stationModelToStationView(res);
        console.log(listStation);
        this.setState({
          listStation,
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
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
