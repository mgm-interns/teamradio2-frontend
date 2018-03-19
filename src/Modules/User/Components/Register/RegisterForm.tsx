import { Component } from 'react';
import * as React from 'react';

export class RegisterForm extends Component {
  render() {
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="icon-user"></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Display name"/>
        </div>
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
          <input type="password" className="form-control" placeholder="Confirm password"/>
        </div>
        <button type="button" className="btn btn-block btn-success">Create Account</button>
      </div>
    );
  }
}