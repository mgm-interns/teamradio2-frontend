import { Component } from 'react';
import * as React from 'react';
import './StationBrowserItem.scss';

export interface IStationBrowserItem {
  stationName: string;
  numberOfOnlineUsers: number;
  picture: string;
}

export class StationBrowserItem extends Component<IStationBrowserItem, {}> {
  constructor(props: IStationBrowserItem) {
    super(props);
  }

  public render() {
    const { stationName, numberOfOnlineUsers, picture } = this.props;
    return (
      <div className="station-item">
        <div className="station-thumbnail">
          <img src={picture || '/img/station_default_cover.png'} />
          <div className="online-user">
            <i
              className={
                numberOfOnlineUsers > 0 ? 'fa fa-circle' : 'fa fa-circle-o'
              }
            />
            <span> {numberOfOnlineUsers} online</span>
          </div>
        </div>
        <div className="row station-name">{stationName}</div>
      </div>
    );
  }
}
