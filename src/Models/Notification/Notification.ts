import { ActionObject, CallBackFunction } from 'react-notification-system';

export class Notification {
  public title?: string;
  public message?: string;
  public level?: 'error' | 'warning' | 'info' | 'success';
  public position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
  public autoDismiss?: number;
  public dismissible?: boolean;
  public action?: ActionObject;
  public children?: React.ReactNode;
  public onAdd?: CallBackFunction;
  public onRemove?: CallBackFunction;
  public uid?: number | string;
}
