import * as classNames from 'classnames';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import './StationBrowserItem.scss';

export interface IStationBrowserItem {
  stationId: string;
  friendlyId: string;
  stationName: string;
  numberOfOnlineUsers: number;
  picture: string;
}

class SBItem extends Component<
  IStationBrowserItem & RouteComponentProps<any>,
  {}
> {
  constructor(props: IStationBrowserItem & RouteComponentProps<any>) {
    super(props);
    this.joinStation = this.joinStation.bind(this);
  }

  public joinStation() {
    const { friendlyId } = this.props;
    this.props.history.push(`/station/${friendlyId}`);
  }

  public render() {
    const {
      stationName,
      numberOfOnlineUsers,
      picture,
      friendlyId,
    } = this.props;
    return (
      <div className="station-item d-flex">
        <div className="thumbnail">
          <img src={picture || '/img/station_default_cover.png'} />
          <div className="online-users">
            <i
              className={classNames('fa', {
                'fa-circle': numberOfOnlineUsers > 0,
                'fa-circle-o': numberOfOnlineUsers <= 0,
              })}
            />
            <span> {numberOfOnlineUsers} online</span>
          </div>
        </div>
        <div className="station-name">
          <span id={`Station-` + friendlyId}>{stationName}</span>
          <UncontrolledTooltip placement="top" target={`Station-` + friendlyId}>
            {stationName}
          </UncontrolledTooltip>
        </div>
      </div>
    );
  }
}

export const StationBrowserItem = withRouter(SBItem);
