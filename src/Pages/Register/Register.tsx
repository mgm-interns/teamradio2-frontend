import * as React from 'react';
import { Component } from 'react';
import { RegisterForm } from "../../Modules/User";
import { ExtraInformationForm } from './ExtraInformationForm';
import '../Register/Register.scss';
import {
  Row,
  Col,
  CardLink
} from 'reactstrap';

export class Register extends Component {

  render() {
    return (
      <div className="register">
        <div className="background-image"></div>
        <div className="container">
          <div className="app flex-row align-items-center">
            <div className="col-md-12">
              <div className="card-group">
                <div className="card text-white py-6 d-md-down-none card-extra-information">
                  <div className="card-container card-body text-center">
                    <ExtraInformationForm></ExtraInformationForm>
                  </div>
                </div>
                <div className="card p-4">
                  <h1>Sign Up</h1>
                  <p className="text-muted">to get the most out of Team Radio</p>
                  <RegisterForm></RegisterForm>
                  <Row>
                    <Col className="login-callout" xs="12" sm="12">
                      <span>Already have an account? <CardLink href="/login">Login</CardLink></span>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}