import { BaseComponent, NotificationInstance } from 'BaseComponent';
import { CustomHeader, Footer } from 'Components';
import {
  ForgotPassword,
  Help,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  Station,
} from 'Pages';
import { object } from 'prop-types';
import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import { Redirect, Route, Switch } from 'react-router-dom';
import './NoSideBarLayout.scss';

export class NoSideBarLayout extends BaseComponent<any, any> {
  public static childContextTypes = {
    notifications: object,
  };

  public notificationInstance: NotificationInstance;
  private notificationRef: any;

  constructor(props: any) {
    super(props);

    this.notificationInstance = new NotificationInstance();
  }

  public getChildContext() {
    return {
      notifications: this.notificationInstance,
    };
  }

  public ref = (nodeRef: any) => {
    this.notificationRef = nodeRef;
    this.notificationInstance.notification = nodeRef;
  };

  public render() {
    return (
      <div className="app no-side-bar">
        <CustomHeader />
        <div className="app-body">
          <main className="main">
            <Switch>
              <Route exact path="/" name="Home" component={Home} />
              <Route path="/login" name="Login" component={Login} />
              <Route path="/register" name="Register" component={Register} />
              <Route
                path="/forgot-password"
                name="ForgotPassword"
                component={ForgotPassword}
              />
              <Route
                path="/reset-password"
                name="ResetPassword"
                component={ResetPassword}
              />
              <Route path="/help" name="Help" component={Help} />
              <Route path="/profile" name="Profile" component={Profile} />
              <Route
                path="/station/:stationId"
                name="Station"
                component={Station}
              />
              <Route path="/profile" name="Profile" component={Profile} />
              <Redirect from="/" to="/" />
            </Switch>
          </main>
        </div>
        <Footer />
        <NotificationSystem ref={this.ref} />
      </div>
    );
  }
}
