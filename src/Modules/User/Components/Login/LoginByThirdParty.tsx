import { Component } from 'react';
import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './LoginByThirdParty.scss';

export class LoginByThirdParty extends Component {
  render() {
    return (
      <div className="social-login">
        <Row>
          <Col>
            <Button className="btn-facebook" block><span>Login with Facebook</span></Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="btn-google-plus" block><span>Login with Google</span></Button>
          </Col>
        </Row>
      </div>
    );
  }
}