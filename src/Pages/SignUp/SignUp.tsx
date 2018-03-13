import * as React from 'react';
import {Component} from 'react';
import './SignUp.scss';

export class SignUp extends Component {

    render() {
        return (

            <div className="container signup">
                <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2250&q=80" alt=""/>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card-group">
                            <div className="card text-white py-5 d-md-down-none card-container1">
                                <div className="card-container card-body text-center">
                                    <div className="card-content">
                                        <h1>A registered user can:</h1>
                                        <ul>
                                            <li>
                                                <i className="icon-check"></i>
                                                <span>Edit profile</span>
                                            </li>
                                            <li>
                                                <i className="icon-check"></i>
                                                <span>Increase your reputation</span>
                                            </li>
                                            <li>
                                                <i className="icon-check"></i>
                                                <span>Play more songs than these anonymous freaks</span>
                                            </li>
                                            <li>
                                                <i className="icon-check"></i>
                                                <span>See some information of the past activities</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4">
                                <div className="card-body p-5">
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="icon-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Username"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="icon-lock"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password"/>
                                    </div>
                                    <div className="input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="icon-lock"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Repeat password"/>
                                    </div>
                                    <button type="button" className="btn btn-block btn-success">Create Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}