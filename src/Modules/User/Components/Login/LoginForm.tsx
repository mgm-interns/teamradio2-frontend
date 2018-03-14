import { Component } from 'react';
import * as React from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export class LoginForm extends Component {
  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Username or Email"/>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Password"/>
        </InputGroup>
        <Button color="success" block>LOG IN</Button>
      </div>
    );
  }
}