import * as React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input } from "reactstrap";
import "./PasswordForm.scss";

export class PasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <div className="password-form">
        <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}
               className='modal-primary modal-lg modal-form-password'>
          <ModalHeader toggle={() => this.props.toggle()}>Edit your password</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Current password</Label>
                  <Input type="text" id="current_password" placeholder="Enter your Current password" required/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">New password</Label>
                  <Input type="text" id="new_password" placeholder="Enter your New password" required/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Confirm password</Label>
                  <Input type="text" id="confirm_password" placeholder="Enter your Confirm password" required/>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={() => this.props.toggle()}>SAVE</Button>
            <Button color="secondary" onClick={() => this.props.toggle()}>CANCEL</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}