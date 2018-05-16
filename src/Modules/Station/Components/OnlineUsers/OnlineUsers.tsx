import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { LoadingIndicator } from 'Components';
import { IApplicationState } from 'Configuration/Redux';
import { reduceByCharacters } from 'Helpers/TextHelper';
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
  public isMe = (id: string) => {
    const { userInfo: currentUser } = this.props;
    if (id && currentUser) {
      return currentUser.id === id;
    }
    return false;
  };

  public renderPopoverContent(onlineUsers: any[], numberOnline: 0) {
    const { userInfo: currentUser } = this.props;

    const filteredUsers = onlineUsers.sort(
      user => (user.username === currentUser.username ? 0 : 1),
    );

    // Only display keep top 10 users
    const filteredList = filteredUsers.filter(
      (user, index) => index < LIST_USERS_SHOW,
    );
    // Group the rest people to anonymous group
    const anonymousUsersCount = numberOnline - filteredList.length;

    return (
      <ListGroup className="popover-container">
        {filteredList.map(
          ({ id, name, username, avatarUrl, points }, index) => (
            <Link to={`/profile/${id}`} key={index}>
              <ListGroupItem
                active={this.isMe(id)}
                className="online-users-list-item">
                <img
                  className="online-users-image"
                  alt="avatar"
                  src={avatarUrl || DEFAULT_USER_AVATAR}
                />
                <span className="online-users-caption">
                  {this.isUserInfoAvailable(currentUser) && this.isMe(id)
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

  public renderOnlineTooltip(list: any[], numberOnline: 0, target: string) {
    const { userInfo: currentUser } = this.props;

    // Only display keep top 10 users
    const filteredList = list.filter((user, index) => index < LIST_USERS_SHOW);
    // Group the rest people to anonymous group
    const anonymousUsersCount = numberOnline - filteredList.length;

    if (this.state.popoverOpen) return null;
    return (
      <UncontrolledTooltip
        placement="bottom"
        target={target}
        className="online-tooltip">
        {filteredList.map(({ id, name, username }, index) => (
          <div key={index} className="align-text-left">
            <span>
              {this.isUserInfoAvailable(currentUser) && this.isMe(id)
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
    if (!this.props.data) {
      return <LoadingIndicator />;
    }

    const { onlineUsers, numberOnline } = this.props.data;

    const filteredListToArray = this.toArray(onlineUsers);
    const filteredListWithoutAnonymous = this.removeAnonymousFromArray(
      filteredListToArray,
    );

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
          filteredListWithoutAnonymous,
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
        {this.renderPopoverContent(filteredListWithoutAnonymous, numberOnline)}
      </Popover>,
    ];
  }

  private toArray = (userMap: any) => {
    return Object.keys(userMap).reduce((prev, key) => {
      return [...prev, userMap[key]];
    }, []);
  };

  private removeAnonymousFromArray = (list: any[]) => {
    const filteredListWithoutAnonymous: any[] = [];
    let countOnline = 0;

    list.forEach(user => {
      countOnline++;
      if (user.username !== 'Anonymous') {
        filteredListWithoutAnonymous.push(user);
      }
    });

    return filteredListWithoutAnonymous;
  };
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

export const OnlineUsers = connect(mapStateToProps, null)(OnlineUsersComponent);
