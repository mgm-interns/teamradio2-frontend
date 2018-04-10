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
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
      }),
    );
  }

  public showSuccess(message: string, title?: string) {
    this.context.store.dispatch(
      success({
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
      }),
    );
  }

  public showWarning(message: string, title?: string) {
    this.context.store.dispatch(
      warning({
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
      }),
    );
  }

  public showInfo(message: string, title?: string) {
    this.context.store.dispatch(
      info({
        message,
        title: title || undefined,
        position: 'tr',
        autoDismiss: 5,
      }),
    );
  }
}
