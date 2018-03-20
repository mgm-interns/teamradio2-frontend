import * as React from 'react';
import { Component } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { InformationForm } from "../../../../Modules/User/Components/InformationForm";
import { PasswordForm } from "../../../../Modules/User/Components/PasswordForm";
import './SelectFormButton.scss';

export class SelectFormButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dropdownOpen: false,
      openInformationForm: true,
      openPasswordForm: true,
      renderInformationForm: false,
      renderPasswordForm: false,
    }
    this.toggle = this.toggle.bind(this);
    this.renderInformationForm = this.renderInformationForm.bind(this, false);
    this.renderPasswordForm = this.renderPasswordForm.bind(this, false);
  }

  toggle() {
    let isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen
    });
  }

  renderInformationForm() {
    this.setState({
      renderInformationForm: !this.state.renderInformationForm,
    })
  }

  renderPasswordForm() {
    this.setState({
      renderPasswordForm: !this.state.renderPasswordForm,
    })
  }

  onOpenInformationForm() {
    this.setState({
      openInformationForm: !this.state.openInformationForm,
      renderInformationForm: !this.state.renderInformationForm,
    })
  }

  onOpenPasswordForm() {
    this.setState({
      openPasswordForm: !this.state.openPasswordForm,
      renderPasswordForm: !this.state.renderPasswordForm,
    })
  }

  reset() {
    this.setState({
      openInformationForm: true,
      openPasswordForm: true
    })
  }

  render() {
    return (
      <div className="setting">
        <Dropdown className="drop-down" isOpen={this.state.dropdownOpen} toggle={() => {
          this.toggle();
        }}>
          <DropdownToggle className="nav-link dropdown-toggle button-dropdown-setting" onClick={() => this.reset()}>
            <span><i className="fa fa-pencil"></i></span>
          </DropdownToggle>
          <DropdownMenu right className="drop-down-menu">
            <DropdownItem className="drop-item" onClick={() => {
              this.renderInformationForm();
            }}><i className="fa fa-user"></i>Information</DropdownItem>
            <DropdownItem className="drop-item" onClick={() => {
              this.renderPasswordForm();
            }}><i className="fa fa-key"></i>Password</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.state.renderInformationForm ?
          <InformationForm isOpen={this.state.openInformationForm} toggle={() => this.onOpenInformationForm()}/> : null}
        {this.state.renderPasswordForm ?
          <PasswordForm isOpen={this.state.openPasswordForm} toggle={() => this.onOpenPasswordForm()}/> : null}
      </div>
    )
  }
}