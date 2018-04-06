import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './StationBrowserItem.scss';

export interface IStationBrowserItem {
  stationId: string;
  stationName: string;
  numberOfOnlineUsers: number;
  picture: string;
}

export class StationBrowserItems extends Component<
  IStationBrowserItem & RouteComponentProps<any>,
  {}
> {
  constructor(props: IStationBrowserItem & RouteComponentProps<any>) {
    super(props);
    this.joinStation = this.joinStation.bind(this);
  }

  public joinStation() {
    const { stationId } = this.props;
    this.props.history.push(`/station/${stationId}`);
  }

  public render() {
    const { stationName, numberOfOnlineUsers, picture } = this.props;
    return (
      <div className="station-item" onClick={this.joinStation}>
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

export const StationBrowserItem = withRouter(StationBrowserItems);
