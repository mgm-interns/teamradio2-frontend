import * as React from 'react';
import { Component } from 'react';
import { isLocalhost } from '../BrowserHelper';

export class HttpsRedirector extends Component {
  public render() {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.protocol === 'http:' &&
      !isLocalhost()
    ) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        'https',
      );
    }

    return <div>{this.props.children}</div>;
  }
}
