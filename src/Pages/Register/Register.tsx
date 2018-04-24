import { RegisterForm } from 'Modules/User';
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { ExtraInformationForm } from './ExtraInformationForm';
import './Register.scss';

export class Register extends Component {
  public render() {
    return (
      <div className="register a app flex-row align-items-center">
        <div className="background-image" />
        <Container>
          <Col md="12">
            <div className="card-group">
              <div className="card text-white py-6 d-md-down-none card-extra-information">
                <div className="card-container card-body text-center">
                  <ExtraInformationForm />
                </div>
              </div>
              <div className="card p-4">
                <h1>Sign Up</h1>
                <p className="text-muted">to get the most out of Team Radio</p>
                <RegisterForm />
                <Row>
                  <Col className="login-callout" xs="12" sm="12">
                    <span>
                      Already have an account? <Link to="/login">Login</Link>
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    );
  }
}
