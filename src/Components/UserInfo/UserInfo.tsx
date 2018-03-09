import * as React from 'react';
import { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import './UserInfo.scss';

export class UserInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    let isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen
    });
  }

  render() {
    return (
      <div className="user-info">
        <img className="img-avatar" alt="avatar" src="img/avatars/1.jpg"/>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => {
          this.toggle();
        }}>
          <DropdownToggle caret>
            Team Radio
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Signed in as:</DropdownItem>
            <DropdownItem header>Team Radio</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>Your profile</DropdownItem>
            <DropdownItem>Help</DropdownItem>
            <DropdownItem>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
