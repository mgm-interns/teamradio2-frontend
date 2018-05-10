import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
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

const fixture = [
  {
    id: '5acdce8373f8d20004bc3314',
    name: 'Mars',
    username: 'lybaokhanh',
    avatarUrl: '',
    points: 200,
  },
  {
    id: '5acdce8373f8d20004bc3314',
    name: 'Lamth2',
    username: 'lamth2',
    avatarUrl: '',
    points: 130,
  },
  {
    id: '5acdce8373f8d20004bc3314',
    name: 'Liquid',
    username: 'lybaokhanh',
    avatarUrl: '',
    points: 455,
  },
  {
    id: '5acdce8373f8d20004bc3314',
    name: 'Navi',
    username: 'lybaokhanh',
    avatarUrl: '',
    points: 600,
  },
];

const currentUser = {
  id: '5acdce8373f8d20004bc3314',
  name: 'Lamth2',
  username: 'lamth2',
  avatarUrl: '',
  points: 10,
  password: '',
  email: 'lamth2@gmail.com',
};

interface IProps {
  userInfo?: RegisteredUser;
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
    // TODO: enable after fix fetch user info
    // if (username && this.props.userInfo) {
    //   return this.props.userInfo.username === username;
    // }
    if (username && currentUser) {
      return currentUser.username === username;
    }
    return false;
  };

  public renderPopoverContent() {
    const filteredUsers = fixture.sort(
      user => (user.username === currentUser.username ? 1 : 0),
    );
    return (
      <ListGroup className="popover-container">
        {filteredUsers.map(({ id, name, username, avatarUrl, points }, index) => (
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
        ))}
      </ListGroup>
    );
  }

  public render() {
    return [
      <div
        key={1}
        id="online-users"
        className="online-users-container"
        onClick={this.toggle}>
        <i
          className={classNames('fa', {
            'fa-circle online-color': fixture.length > 0,
            'fa-circle-o': fixture.length <= 0,
          })}
        />
        <span className="online-users-length">
          {fixture.length || '0'} online
        </span>
      </div>,
      <div key={3}>{this.renderOnlineTooltip(fixture, 'online-users')}</div>,
      <Popover
        key={2}
        placement="bottom"
        isOpen={this.state.popoverOpen}
        toggle={this.toggle}
        target="online-users">
        {this.renderPopoverContent()}
      </Popover>,
    ];
  }

  private renderOnlineTooltip(list: any[], target: string) {
    if (this.state.popoverOpen) return null;
    return (
      <UncontrolledTooltip placement="bottom" target={target}>
        {list.map(({ name, username }, index) => (
          <div className="online-tooltip" key={index}>
            <span>
              {this.isUserInfoAvailable(currentUser) && this.isMe(username)
                ? 'YOU'
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
