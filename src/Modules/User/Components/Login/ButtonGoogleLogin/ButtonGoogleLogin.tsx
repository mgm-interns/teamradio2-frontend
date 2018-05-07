import { Inject } from 'Configuration/DI';
import * as React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { UserServices } from 'Services/Http';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;

interface IProps {
  getUserInfo?: () => void;
}

interface IState {}

export class ButtonGoogleLogin extends Component<IProps, IState> {
  @Inject('UserServices') private userServices: UserServices;

  constructor(props: IProps) {
    super(props);

    this.handleResponse = this.handleResponse.bind(this);
  }

  public handleResponse(response: any) {
    const googleAccessToken = response.accessToken;

    this.userServices.loginWithGoogle(googleAccessToken).subscribe(
      (res: any) => {
        this.props.getUserInfo();
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  public handleError() {}

  public render() {
    return (
      <GoogleLogin
        clientId={CLIENT_ID}
        onSuccess={this.handleResponse}
        onFailure={this.handleError}
        className="btn-google-plus btn-block">
        <span>Login with Google</span>
      </GoogleLogin>
    );
  }
}
