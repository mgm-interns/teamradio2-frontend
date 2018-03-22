import * as React from 'react';
import { Component } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./InformationForm.scss";

export class InformationForm extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <form className="information-form">
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Display name</Label>
              <Input type="text" id="display_name" placeholder="Enter your Display name" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Username</Label>
              <Input type="text" id="user_name" placeholder="Enter your Username" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Email</Label>
              <Input type="email" id="email" name="email-input" placeholder="Enter your Email" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">First name</Label>
              <Input type="text" id="first_name" placeholder="Enter your First name" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Last name</Label>
              <Input type="text" id="last_name" placeholder="Enter your Last name" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Bio</Label>
              <Input type="text" id="bio" placeholder="Enter your Bio" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">City</Label>
              <Input type="text" id="city" placeholder="Enter your City" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">Country</Label>
              <Input type="text" id="country" placeholder="Enter your Country" required/>
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