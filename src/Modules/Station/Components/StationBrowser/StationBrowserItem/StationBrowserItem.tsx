import * as classNames from 'classnames';
import { StationInfo } from 'Models';
import { Component } from 'react';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import './StationBrowserItem.scss';

type IProps = StationInfo & RouteComponentProps<any>;

class SBItem extends Component<IProps, {}> {
  public render() {
    const { name, numberOnline = 0, picture, id } = this.props;
    return (
      <Link to={`/station/${this.props.friendlyId}`}>
        <div className="station-item d-flex">
          <div className="thumbnail">
            {picture && (
              <div className="sound-wave">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            )}
            <img src={picture || '/img/station_default_cover.png'} />
            <div className="online-users">
              <i
                className={classNames('fa', {
                  'fa-circle': numberOnline > 0,
                  'fa-circle-o': numberOnline <= 0,
                })}
              />
              <span> {numberOnline} online</span>
            </div>
          </div>
          <div className="station-name">
            <span id={`station-` + id}>{name}</span>
            <UncontrolledTooltip
              placement="top"
              target={`station-` + id}
              delay={0}>
              {name}
            </UncontrolledTooltip>
          </div>
        </div>
      </Link>
    );
  }
}

export const StationBrowserItem = withRouter(SBItem);
