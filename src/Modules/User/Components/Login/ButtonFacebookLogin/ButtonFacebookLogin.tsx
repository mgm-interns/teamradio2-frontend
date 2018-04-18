import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { FacebookLogin } from './FacebookLogin';

export class ButtonFacebookLogin extends Component {
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
        render={(renderProps: any) =>
          ButtonFacebookLogin.renderOwnButton(renderProps)
        }
      />
    );
  }
}
