import * as React from 'react';
import {Component} from 'react';
import {RegisterForm, ExtraInformationForm} from "../../Modules/User";
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
                                <div className="card text-white py-6 d-md-down-none card-ExtraInformation">
                                    <div className="card-container card-body text-center">
                                        <ExtraInformationForm></ExtraInformationForm>
                                    </div>
                                </div>
                                <div className="card p-4">
                                    <RegisterForm></RegisterForm>
                                    <Row>
                                        <Col className="login" xs="12" sm="12">
                                            <span>Already have an account?</span>
                                            <CardLink href="#">Login</CardLink>
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