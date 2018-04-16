import * as React from 'react';
import { Component } from 'react';

interface IFacebookLoginProps {
  isMobile?: boolean;
}

const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i)
    );
  } catch (e) {
    // TODO: remove it
    console.log(e);
  }

  return isMobile;
};

export class FacebookLogin extends Component<IFacebookLoginProps, any> {
  public static defaultProps = {
    isMobile: getIsMobile(),
  };

  public render() {
    return <div>this is facebook login</div>;
  }
}
