import { Component } from 'react';
import * as React from 'react';
import './StationBrowserItem.scss'

interface IStationBrowserItemInfoProps {
  numberOfOnlineUsers: number,
}

export class StationBrowserItemInfo extends Component<IStationBrowserItemInfoProps, {}> {
  constructor(props: IStationBrowserItemInfoProps) {
    super(props);
  }

  public render() {
    const {numberOfOnlineUsers} = this.props;
    return (
      <div className="station-thumbnail">
        <img src="./img/station_default_cover.png"/>
        <div className="online-user">
          <i className={numberOfOnlineUsers > 0 ? "fa fa-circle" : "fa fa-circle-o"} />
          <span> {numberOfOnlineUsers} online</span>
        </div>
      </div>
    );
  }
}
