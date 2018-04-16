import * as React from 'react';
import { Component } from 'react';

import { Button } from 'reactstrap';
import '../LoginByThirdParty';

const CLIENT_ID = process.env.REACT_APP_FACEBOOK_API_CLIENT_ID;

declare global {
  interface Window {
    // tslint:disable-line
    fbAsyncInit: () => void;
    FB: any;
    src: string;
  }
}

interface IFacebookLoginProps {
  isMobile?: boolean;
  xfbml?: boolean;
  cookie?: boolean;
  version?: string;
  state?: string;
  responseType?: string;
  language?: string;
  fields?: string;
  callback?: () => void;
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
    xfbml: false,
    cookie: false,
    version: '2.12',
    state: 'facebookdirect',
    responseType: 'code',
    language: 'en_US',
    fields: 'name',
  };

  constructor(props: IFacebookLoginProps) {
    super(props);

    this.state = {
      isSdkLoaded: false,
      isProcessing: false,
    };
  }

  public componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      this.sdkLoaded();
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsync();
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
  }

  public sdkLoaded() {
    this.setState({ isSdkLoaded: true });
  }

  public setFbAsyncInit() {
    const { xfbml, cookie, version } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        xfbml,
        cookie,
        version: `v${version}`,
        appId: CLIENT_ID,
      });
      this.setState({ isSdkLoaded: true });
    };
  }

  public loadSdkAsync() {
    const { language } = this.props;
    ((document, script, id) => {
      const element = document.getElementsByTagName(script)[0];
      const fjs = element;
      let js: any = element;
      if (document.getElementById(id)) {
        return;
      }
      js = document.createElement(script);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  public render() {
    return (
      <Button className="btn-facebook" block>
        <span>Login with Facebook</span>
      </Button>
    );
  }
}
