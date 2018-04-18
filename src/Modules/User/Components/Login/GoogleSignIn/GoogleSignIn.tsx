import * as React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;

export class GoogleSignIn extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public responseGoogle(res: any) {
    console.log(res);
  }

  public render() {
    return (
      <GoogleLogin
        clientId={CLIENT_ID}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        className="btn-google-plus btn-block">
        <span>Login with Google</span>
      </GoogleLogin>
    );
  }
}
