import * as classNames from 'classnames';
import { StationItem } from 'Models';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import './StationBrowserItem.scss';

type IProps = StationItem & RouteComponentProps<any>;

class SBItem extends Component<IProps, {}> {
  public joinStation = () => {
    const { friendlyId } = this.props;
    this.props.history.push(`/station/${friendlyId}`);
  };

  public render() {
    const { name, numberOnline = 0, picture, id } = this.props;
    return (
      <div className="station-item d-flex" onClick={this.joinStation}>
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
          <UncontrolledTooltip placement="top" target={`station-` + id}>
            {name}
          </UncontrolledTooltip>
        </div>
      </div>
    );
  }
}

export const StationBrowserItem = withRouter(SBItem);
