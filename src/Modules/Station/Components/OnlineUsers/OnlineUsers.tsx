import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { LoadingIndicator } from 'Components';
import { IApplicationState } from 'Configuration/Redux';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Popover,
  UncontrolledTooltip,
} from 'reactstrap';
import { DEFAULT_USER_AVATAR } from '../../../User/Constants';
import './OnlineUsers.scss';

interface IProps {
  userInfo?: RegisteredUser;
  data: any;
}

interface IState {
  popoverOpen: boolean;
}

export class OnlineUsersComponent extends BaseComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      popoverOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.renderPopoverContent = this.renderPopoverContent.bind(this);
  }

  public toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  public isUserInfoAvailable = (userInfo: RegisteredUser) => {
    return userInfo !== null;
  };

  public isMe = (username?: string) => {
    if (username && this.props.userInfo) {
      return this.props.userInfo.username === username;
    }
    return false;
  };

  public renderPopoverContent(onlineUsers: RegisteredUser) {
    const filteredListToArray = this.toArray(onlineUsers);
    const { userInfo } = this.props;

    const filteredUsers = filteredListToArray.sort(
      user => (user.username === userInfo.username ? 0 : 1),
    );
    return (
      <ListGroup className="popover-container">
        {filteredUsers.map(
          ({ id, name, username, avatarUrl, points }, index) => (
            <Link to={`/profile/${id}`} key={index}>
              <ListGroupItem
                active={this.isMe(username)}
                className="online-users-list-item">
                <div className="online-users-shape">
                  <img
                    className="online-users-image"
                    alt="avatar"
                    src={avatarUrl || DEFAULT_USER_AVATAR}
                  />
                </div>
                <span className="online-users-caption">
                  {this.isUserInfoAvailable(currentUser) && this.isMe(username)
                    ? `You (${points})`
                    : `${name} (${points})`}
                </span>
              </ListGroupItem>
            </Link>
          ),
        )}
      </ListGroup>
    );
  }

  public render() {
    if (!this.props.data) {
      return <LoadingIndicator />;
    }

    const { onlineUsers, numberOnline } = this.props.data;

    return [
      <div
        key={1}
        id="online-users"
        className="online-users-container"
        onClick={this.toggle}>
        <i
          className={classNames('fa', {
            'fa-circle online-color': numberOnline > 0,
            'fa-circle-o': numberOnline <= 0,
          })}
        />
        <span className="online-users-length">
          {numberOnline || '0'} online
        </span>
      </div>,
      <div key={3}>{this.renderOnlineTooltip(fixture, 'online-users')}</div>,
      <Popover
        key={2}
        placement="bottom"
        isOpen={this.state.popoverOpen}
        toggle={this.toggle}
        target="online-users">
        {this.renderPopoverContent(onlineUsers)}
      </Popover>,
    ];
  }

  private toArray = (userMap: any) => {
    return Object.keys(userMap).reduce((prev, key) => {
      return [...prev, userMap[key]];
    }, []);
  };

  private renderOnlineTooltip(list: any[], target: string) {
    if (this.state.popoverOpen) return null;
    return (
      <UncontrolledTooltip placement="bottom" target={target}>
        {list.map(({ name, username }, index) => (
          <div className="online-tooltip" key={index}>
            <span>
              {this.isUserInfoAvailable(currentUser) && this.isMe(username)
                ? 'You'
                : name}
            </span>
            <br />
          </div>
        ))}
      </UncontrolledTooltip>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

export const OnlineUsers = connect(mapStateToProps, null)(OnlineUsersComponent);
