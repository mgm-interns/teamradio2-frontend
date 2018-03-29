import * as React from 'react';
import { Component } from 'react';
import { RegisterForm } from "Modules/User";
import { ExtraInformationForm } from './ExtraInformationForm';
import '../Register/Register.scss';
import { Row, Col, CardLink } from 'reactstrap';

export class Register extends Component {

  render() {
    return (
      <div className="app register">
        <img src="img/register-background.jpg" alt="" className="background-image"/>
        <div className="main-form-container">
          <Col md="10" className="main-form-layout">
            <div className="card-group">
              <div className="card text-white py-6 d-md-down-none card-extra-information">
                <div className="card-container card-body text-center">
                  <ExtraInformationForm/>
                </div>
              </div>
              <div className="card p-4">
                <h1>Sign Up</h1>
                <p className="text-muted">to get the most out of Team Radio</p>
                <RegisterForm/>
                <Row>
                  <Col className="login-callout" xs="12" sm="12">
                    <span>Already have an account? <CardLink href="/login">Login</CardLink></span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
