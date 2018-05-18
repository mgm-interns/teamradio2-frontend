import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { LoadingIndicator } from 'Components';
import { IApplicationState } from 'Configuration/Redux';
import { reduceByCharacters } from 'Helpers/TextHelper';
import { RegisteredUser, StationInfo } from 'Models';
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
  station: StationInfo;
}

interface IState {
  popoverOpen: boolean;
}

const LIST_USERS_SHOW = 8;

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

  // TODO: using username instead id when backend support it
  // check isCurrentUser by id
  public isCurrentUser = (id: string) => {
    const { userInfo: currentUser } = this.props;
    if (id && currentUser) {
      return currentUser.id === id;
    }
    return false;
  };

  public renderPopoverContent(
    onlineUsers: RegisteredUser[],
    numberOnline: number,
  ) {
    const { userInfo: currentUser } = this.props;

    const filteredUsers = onlineUsers.sort(
      user => (user.username === currentUser.username ? 0 : 1),
    );

    const filteredListTopUsers = filteredUsers.filter(
      (user, index) => index < LIST_USERS_SHOW,
    );
    // Group the rest people to anonymous group
    const anonymousUsersCount = numberOnline - filteredListTopUsers.length;

    return (
      <ListGroup className="popover-container">
        {filteredListTopUsers.map(
          ({ id, name, username, avatarUrl, points }, index) => (
            <Link to={`/profile/${id}`} key={index}>
              <ListGroupItem
                active={this.isCurrentUser(id)}
                className="online-users-list-item">
                <img
                  className="online-users-image"
                  alt="avatar"
                  src={avatarUrl || DEFAULT_USER_AVATAR}
                />
                <span className="online-users-caption">
                  {this.isUserInfoAvailable(currentUser) &&
                  this.isCurrentUser(id)
                    ? `You (${points || 0})`
                    : `${reduceByCharacters(name) || 'Unknown'} (${points ||
                        0})`}
                </span>
              </ListGroupItem>
            </Link>
          ),
        )}
        {anonymousUsersCount > 0 ? (
          <ListGroupItem className="online-users-list-item">
            <div className="online-users-anonymous">
              <span className="online-users-anonymous-text">
                {anonymousUsersCount}
              </span>
            </div>
            <span className="online-users-caption">Anonymous</span>
          </ListGroupItem>
        ) : null}
      </ListGroup>
    );
  }

  public renderOnlineTooltip(
    onlineUsers: RegisteredUser[],
    numberOnline: number,
    target: string,
  ) {
    const { userInfo: currentUser } = this.props;

    const filteredUsers = onlineUsers.sort(
      user => (user.username === currentUser.username ? 0 : 1),
    );
    const filteredListTopUsers = filteredUsers.filter(
      (user, index) => index < LIST_USERS_SHOW,
    );
    // Group the rest people to anonymous group
    const anonymousUsersCount = numberOnline - filteredListTopUsers.length;

    if (this.state.popoverOpen) return null;
    return (
      <UncontrolledTooltip
        placement="bottom"
        target={target}
        className="online-tooltip">
        {filteredListTopUsers.map(({ id, name, username }, index) => (
          <div key={index} className="align-text-left">
            <span>
              {this.isUserInfoAvailable(currentUser) && this.isCurrentUser(id)
                ? 'You'
                : `${reduceByCharacters(name) || 'Unknown'}`}
            </span>
            <br />
          </div>
        ))}
        {anonymousUsersCount > 0 ? (
          <span className="align-text-left">
            and {anonymousUsersCount} more
          </span>
        ) : null}
      </UncontrolledTooltip>
    );
  }

  public render() {
    if (!this.props.station) {
      return <LoadingIndicator />;
    }

    const { onlineUsers, numberOnline = 0 } = this.props.station;

    const filteredListToArray = this.covertMapToArray(onlineUsers);

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
      <div key={3}>
        {this.renderOnlineTooltip(
          filteredListToArray,
          numberOnline,
          'online-users',
        )}
      </div>,
      <Popover
        key={2}
        placement="bottom"
        isOpen={this.state.popoverOpen}
        toggle={this.toggle}
        target="online-users">
        {this.renderPopoverContent(filteredListToArray, numberOnline)}
      </Popover>,
    ];
  }

  private covertMapToArray = (userMap: any) => {
    return Object.keys(userMap).reduce((prev, key) => {
      return [...prev, userMap[key]];
    }, []);
  };
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

export const OnlineUsers = connect(mapStateToProps, null)(OnlineUsersComponent);
