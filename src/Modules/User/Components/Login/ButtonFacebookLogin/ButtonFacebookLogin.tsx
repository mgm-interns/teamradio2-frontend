import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { FacebookLogin } from './FacebookLogin';

interface IProps {
  getUserInfo?: () => void;
}

export class ButtonFacebookLogin extends Component<IProps, any> {
  public static renderOwnButton(renderProps: any) {
    const { onClick } = renderProps;
    return (
      <Button className="btn-facebook" onClick={onClick} block>
        <span>Login with Facebook</span>
      </Button>
    );
  }

  public render() {
    return (
      <FacebookLogin
        getUserInfo={this.props.getUserInfo}
        render={(renderProps: any) =>
          ButtonFacebookLogin.renderOwnButton(renderProps)
        }
      />
    );
  }
}
