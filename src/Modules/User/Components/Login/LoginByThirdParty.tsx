import { Component } from 'react';
import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { FacebookLoginWithButton } from './FacebookLogin';
import { GoogleSignIn } from './GoogleSignIn';
import './LoginByThirdParty.scss';

export class LoginByThirdParty extends Component {
  public render() {
    return (
      <div className="social-login">
        <Row>
          <Col>
            <FacebookLoginWithButton />
          </Col>
        </Row>
        <Row>
          <Col>
            <GoogleSignIn />
          </Col>
        </Row>
      </div>
    );
  }
}
