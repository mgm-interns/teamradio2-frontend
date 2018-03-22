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
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export class SelectFormButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dropdownOpen: false,
      openInformationForm: false,
      openPasswordForm: false,
    }
    this.toggle = this.toggle.bind(this);
    this.renderInformationForm = this.renderInformationForm.bind(this);
    this.renderPasswordForm = this.renderPasswordForm.bind(this);
    this.openInformationForm = this.openInformationForm.bind(this);
    this.openPasswordForm = this.openPasswordForm.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  toggle() {
    let isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen
    });
  }

  openInformationForm() {
    this.setState({
      openInformationForm: true,
      openPasswordForm: false,
    })
  }

  openPasswordForm() {
    this.setState({
      openInformationForm: false,
      openPasswordForm: true,
    })
  }

  onCloseModal() {
    this.setState({
      openInformationForm: false,
      openPasswordForm: false,
    });
  }

  renderModal(openState: any, modalHeadline: any, component: any) {
    return (
      <Modal isOpen={openState} toggle={() => this.onCloseModal()}
             className='modal-primary modal-lg modal-edit-form'>
        <ModalHeader toggle={() => this.onCloseModal()}>{modalHeadline}</ModalHeader>
        <ModalBody>
          {component}
        </ModalBody>
      </Modal>
    );
  }

  renderInformationForm() {
    return this.renderModal(
      this.state.openInformationForm,
      'Edit your information',
      <InformationForm onCloseModal={() => this.onCloseModal()}/>
    );
  }

  renderPasswordForm() {
    return this.renderModal(
      this.state.openPasswordForm,
      'Edit your password',
      <PasswordForm onCloseModal={() => this.onCloseModal()} hadPass={true}/>
    );
  }

  render() {
    return (
      <div className="setting">
        <Dropdown className="drop-down" isOpen={this.state.dropdownOpen} toggle={() => {
          this.toggle();
        }}>
          <DropdownToggle className="nav-link dropdown-toggle button-dropdown-setting">
            <span><i className="fa fa-pencil"></i></span>
          </DropdownToggle>
          <DropdownMenu right className="drop-down-menu">
            <DropdownItem className="drop-item" onClick={() => {
              this.openInformationForm();
            }}><i className="fa fa-user"></i>Information</DropdownItem>
            <DropdownItem className="drop-item" onClick={() => {
              this.openPasswordForm();
            }}><i className="fa fa-key"></i>Password</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.state.openInformationForm ? this.renderInformationForm() : null}
        {this.state.openPasswordForm ? this.renderPasswordForm() : null}
      </div>
    )
  }
}