import * as React from 'react';
import { Component } from 'react';

import { object } from 'prop-types';
import { error, info, success, warning } from 'react-notification-system-redux';

export class BaseComponent<P, S> extends Component<P, S> {
  public static contextTypes = {
    store: object,
  };

  public showError(message: string, title?: string) {
    this.context.store.dispatch(
      error({
        // uid: 'once-please', // you can specify your own uid if required
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
        // action: {
        //   label: 'Click me!!',
        //   callback: () => alert('clicked!'),
        // },
      }),
    );
  }

  public showSuccess(message: string, title?: string) {
    this.context.store.dispatch(
      success({
        // uid: 'once-please', // you can specify your own uid if required
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
        // action: {
        //   label: 'Click me!!',
        //   callback: () => alert('clicked!'),
        // },
      }),
    );
  }

  public showWarning(message: string, title?: string) {
    this.context.store.dispatch(
      warning({
        // uid: 'once-please', // you can specify your own uid if required
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
        // action: {
        //   label: 'Click me!!',
        //   callback: () => alert('clicked!'),
        // },
      }),
    );
  }

  public showInfo(message: string, title?: string) {
    this.context.store.dispatch(
      info({
        // uid: 'once-please', // you can specify your own uid if required
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
        // action: {
        //   label: 'Click me!!',
        //   callback: () => alert('clicked!'),
        // },
      }),
    );
  }
}
