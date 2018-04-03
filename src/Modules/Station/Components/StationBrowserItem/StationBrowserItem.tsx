import { Component } from 'react';
import * as React from 'react';
import './StationBrowserItem.scss'

interface IStationBrowserItemProps {
  numberOfOnlineUsers: number,
}

export class StationBrowserItem extends Component<IStationBrowserItemProps, {}> {
  constructor(props: IStationBrowserItemProps) {
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
