import { Component } from 'react';
import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';

export class LoginByThirdParty extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="12" sm="6">
            <Button className="btn-facebook" block><span>facebook</span></Button>
          </Col>
          <Col xs="12" sm="6">
            <Button className="btn-google-plus" block><span>google</span></Button>
          </Col>
        </Row>
      </div>
    );
  }
}