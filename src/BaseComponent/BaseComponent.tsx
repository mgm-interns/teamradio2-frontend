import * as React from 'react';
import { Component } from 'react';

interface IContextTypes {
  notifcations: object;
}

export class BaseComponent<P, S> extends Component<P, S> {
  public static contextTypes: IContextTypes;

  public showError(message: string, title?: string) {
    this.context.notifications._notification.addNotification({
      message,
      title: title || undefined,
      level: 'error',
      position: 'tr',
      autoDismiss: 5,
    });
  }

  public showWarning(message: string, title?: string) {
    this.context.notifications._notification.addNotification({
      message,
      title: title || undefined,
      level: 'warning',
      position: 'tr',
      autoDismiss: 5,
    });
  }

  public showSuccess(message: string, title?: string) {
    this.context.notifications._notification.addNotification({
      message,
      title: title || undefined,
      level: 'success',
      position: 'tr',
      autoDismiss: 5,
    });
  }

  public showInfo(message: string, title?: string) {
    this.context.notifications._notification.addNotification({
      message,
      title: title || undefined,
      level: 'info',
      position: 'tr',
      autoDismiss: 5,
    });
  }
}
