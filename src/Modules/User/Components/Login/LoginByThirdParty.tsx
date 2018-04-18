import { Component } from 'react';
import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { ButtonFacebookLogin } from './ButtonFacebookLogin';
import { ButtonGoogleLogin } from './ButtonGoogleLogin';
import './LoginByThirdParty.scss';

export class LoginByThirdParty extends Component {
  public render() {
    return (
      <div className="social-login">
        <Row>
          <Col>
            <ButtonFacebookLogin />
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGoogleLogin />
          </Col>
        </Row>
      </div>
    );
  }
}
