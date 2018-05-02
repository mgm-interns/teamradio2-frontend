import { BaseComponent } from 'BaseComponent';
import * as React from 'react';
import { ListGroup, ListGroupItem, Popover } from 'reactstrap';
import './OnlineUsers.scss';

const DEFAULT_USER_AVATAR = '/img/avatars/1.jpg';

const fixture = [
  {
    name: 'Mars',
    username: 'lybaokhanh',
    avatar_url: '',
    points: 20,
  },
  {
    name: 'Lamth2',
    username: 'lamth2',
    avatar_url: '',
    points: 20,
  },
  {
    name: 'Liquid',
    username: 'lybaokhanh',
    avatar_url: '',
    points: 20,
  },
  {
    name: 'Navi',
    username: 'lybaokhanh',
    avatar_url: '',
    points: 20,
  },
];

interface IProps {}

interface IState {
  popoverOpen: boolean;
}

export class OnlineUsers extends BaseComponent<IProps, IState> {
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

  public renderPopoverContent() {
    const filteredUsers = fixture;
    return (
      <ListGroup className="online-users-list">
        {filteredUsers.map(({ name, username, avatar_url, points }) => (
          <ListGroupItem className="online-users-list-item">
            <div className="online-users-shape">
              <img
                className="online-users-image"
                alt="avatar"
                src={avatar_url || DEFAULT_USER_AVATAR}
              />
            </div>
            <span className="online-users-caption">{`${name} (${points})`}</span>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  public render() {
    return [
      <div
        key={1}
        className="online-users-container"
        id="online-users"
        onClick={this.toggle}>
        <span>1 online</span>
      </div>,
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
}
