export class NotificationInstance {
  private _notification: any;
  public get notification() {
    return this._notification;
  }

  public set notification(notification: any) {
    this._notification = notification;
  }
}
