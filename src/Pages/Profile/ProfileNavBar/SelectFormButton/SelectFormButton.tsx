import { InformationForm } from 'Modules/User/Components/InformationForm';
import { PasswordForm } from 'Modules/User/Components/PasswordForm';
import * as React from 'react';
import { Component } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './SelectFormButton.scss';

export class SelectFormButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dropdownOpen: false,
      openInformationForm: false,
      openPasswordForm: false,
    };
    this.toggle = this.toggle.bind(this);
    this.renderInformationForm = this.renderInformationForm.bind(this);
    this.renderPasswordForm = this.renderPasswordForm.bind(this);
    this.openInformationForm = this.openInformationForm.bind(this);
    this.openPasswordForm = this.openPasswordForm.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  public toggle() {
    const isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen,
    });
  }

  public openInformationForm() {
    this.setState({
      openInformationForm: true,
      openPasswordForm: false,
    });
  }

  public openPasswordForm() {
    this.setState({
      openInformationForm: false,
      openPasswordForm: true,
    });
  }

  public onCloseModal() {
    this.setState({
      openInformationForm: false,
      openPasswordForm: false,
    });
  }

  public renderModal(openState: any, modalHeadline: any, component: any) {
    return (
      <Modal
        isOpen={openState}
        toggle={() => this.onCloseModal()}
        className="modal-primary modal-lg modal-edit-form disable-outline-modal">
        <ModalHeader toggle={() => this.onCloseModal()}>
          {modalHeadline}
        </ModalHeader>
        <ModalBody>{component}</ModalBody>
      </Modal>
    );
  }

  public renderInformationForm() {
    return this.renderModal(
      this.state.openInformationForm,
      'Edit your information',
      <InformationForm onCloseModal={() => this.onCloseModal()} />,
    );
  }

  public renderPasswordForm() {
    return this.renderModal(
      this.state.openPasswordForm,
      'Edit your password',
      <PasswordForm onCloseModal={() => this.onCloseModal()} hadPass={true} />,
    );
  }

  public render() {
    return (
      <div className="setting">
        <Dropdown
          className="drop-down"
          isOpen={this.state.dropdownOpen}
          toggle={() => {
            this.toggle();
          }}>
          <DropdownToggle className="nav-link dropdown-toggle button-dropdown-setting">
            <span>
              <i className="fa fa-pencil" />
            </span>
          </DropdownToggle>
          <DropdownMenu right className="drop-down-menu">
            <DropdownItem
              className="drop-item"
              onClick={() => {
                this.openInformationForm();
              }}>
              <i className="fa fa-user" />Information
            </DropdownItem>
            <DropdownItem
              className="drop-item"
              onClick={() => {
                this.openPasswordForm();
              }}>
              <i className="fa fa-key" />Password
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.state.openInformationForm ? this.renderInformationForm() : null}
        {this.state.openPasswordForm ? this.renderPasswordForm() : null}
      </div>
    );
  }
}
