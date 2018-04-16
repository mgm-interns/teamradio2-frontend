import * as React from 'react';
import { Component } from 'react';
import getParamsFromObject from 'Utilities/objectToParams';

const CLIENT_ID = process.env.REACT_APP_FACEBOOK_API_CLIENT_ID;

declare global {
  // tslint:disable-next-line
  interface Window {
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
  language?: string;
  fields?: string;
  render: any;
  redirectUri?: string;
  returnScopes?: boolean;
  responseType?: string;
  authType?: string;
}

const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i)
    );
  } catch (e) {
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
    language: 'en_US',
    fields: 'name',
    redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
    returnScopes: false,
    responseType: 'code',
    authType: '',
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

  public checkLoginState = (response: any) => {
    this.setState({ isProcessing: false });
    console.log(response.authResponse);
  };

  public click = (e: EventSource) => {
    if (!this.state.isSdkLoaded) {
      return;
    }
    this.setState({ isProcessing: true });

    const {
      redirectUri,
      returnScopes,
      responseType,
      authType,
    } = this.props;

    const params = {
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      return_scopes: returnScopes,
      response_type: responseType,
      auth_type: authType,
    };

    if (this.props.isMobile) {
      window.location.href = `//www.facebook.com/dialog/oauth${getParamsFromObject(
        params,
      )}`;
    } else {
      window.FB.login(this.checkLoginState, {
        return_scopes: returnScopes,
        auth_type: params.auth_type,
      });
    }
  };

  public render() {
    const propsForRender = {
      onClick: this.click,
      isProcessing: this.state.isProcessing,
      isSdkLoaded: this.state.isSdkLoaded,
    };
    return this.props.render(propsForRender);
  }
}
