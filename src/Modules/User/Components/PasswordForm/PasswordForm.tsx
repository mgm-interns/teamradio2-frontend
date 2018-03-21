import * as React from 'react';
import { Component } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./PasswordForm.scss";

export class PasswordForm extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <form className="password-form">
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Current password</Label>
              <Input type="password" id="current_password" placeholder="Enter your Current password" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">New password</Label>
              <Input type="password" id="new_password" placeholder="Enter your New password" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Confirm password</Label>
              <Input type="password" id="confirm_password" placeholder="Enter your Confirm password" required/>
            </FormGroup>
          </Col>
        </Row>
        <div className="footer-form">
          <Button color="secondary" onClick={() => this.props.onCloseModal()}>CANCEL</Button>
          <Button type="submit" color="primary" onClick={() => this.props.onCloseModal()}>SAVE</Button>
        </div>
      </form>
    )
  }
}