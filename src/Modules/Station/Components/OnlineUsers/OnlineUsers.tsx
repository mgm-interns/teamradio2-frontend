import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
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
    name: 'Mars',
    username: 'lybaokhanh',
    avatarUrl: '',
    // points: 20,
  },
  {
    name: 'Lamth2',
    username: 'lamth2',
    avatarUrl: '',
    // points: 10,
  },
  {
    name: 'Liquid',
    username: 'lybaokhanh',
    avatarUrl: '',
    // points: 5,
  },
  {
    name: 'Navi',
    username: 'lybaokhanh',
    avatarUrl: '',
    // points: 60,
  },
];

const currentUser = {
  id: '1213123',
  name: 'Lamth2',
  username: 'lamth2',
  avatarUrl: '',
  // points: 10,
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
      user => (user.username === currentUser.username ? 0 : 1),
    );
    return (
      <ListGroup>
        {filteredUsers.map(({ name, username, avatarUrl }, index) => (
          <ListGroupItem
            key={index}
            active={this.isMe(username)}
            className="online-users-list-item">
            <div className="online-users-shape">
              <img
                className="online-users-image"
                alt="avatar"
                src={avatarUrl || DEFAULT_USER_AVATAR}
              />
            </div>
            <span className="online-users-caption">{`${
              this.isUserInfoAvailable(currentUser) && this.isMe(username)
                ? 'YOU'
                : name
            }`}</span>
          </ListGroupItem>
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
      this.renderOnlineTooltip(fixture, 'online-users'),
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
        {list.map(({ name, username }) => (
          <div>
            <span>
              {this.isUserInfoAvailable(currentUser) && this.isMe(username)
                ? 'YOU'
                : name}
            </span><br/>
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
