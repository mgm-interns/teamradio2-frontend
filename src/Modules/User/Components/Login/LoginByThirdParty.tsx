import { Component } from 'react';
import * as React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FacebookLoginWithButton } from './FacebookLogin';
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
            <Button className="btn-google-plus" block>
              <span>Login with Google</span>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
