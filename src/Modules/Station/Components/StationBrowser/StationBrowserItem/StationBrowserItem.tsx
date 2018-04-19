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
    const { name, numberOfOnlineUsers = 0, picture, id } = this.props;
    return (
      <div className="station-item d-flex" onClick={this.joinStation}>
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
