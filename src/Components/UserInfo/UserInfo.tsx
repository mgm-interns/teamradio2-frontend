import * as React from 'react';
import { Component, Fragment } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import './UserInfo.scss';

export class UserInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  public toggle() {
    const isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen,
    });
  }

  public render() {
    const { signOut, userInfo: { name } } = this.props;
    return (
      <Fragment>
        <span className="reputation">Reputation: {20}</span>
        <div className="user-info">
          <Dropdown
            className="drop-down"
            isOpen={this.state.dropdownOpen}
            toggle={() => {
              this.toggle();
            }}>
            <DropdownToggle className="nav-link dropdown-toggle button-dropdown-toggle">
              <img
                className="img-avatar"
                alt="avatar"
                src="/img/avatars/1.jpg"
              />
              <span className="d-md-down-none">{name}</span>
            </DropdownToggle>
            <DropdownMenu right className="drop-down-menu">
              <DropdownItem header className="drop-item">
                <span>Signed in as: </span>
                <br />
                {name}
              </DropdownItem>
              <DropdownItem className="drop-item" href="/profile">
                <i className="fa fa-user" />Your profile
              </DropdownItem>
              <DropdownItem className="drop-item" href="/help">
                <i className="fa fa-question-circle" />Help
              </DropdownItem>
              <DropdownItem className="drop-item">
                <div onClick={signOut}>
                  <i className="fa fa-sign-out" />
                  Sign out
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Fragment>
    );
  }
}
