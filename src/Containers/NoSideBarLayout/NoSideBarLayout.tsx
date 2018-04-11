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
import * as React from 'react';
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './NoSideBarLayout.scss';

import { IApplicationState } from 'Configuration/Redux';
import { Notification } from 'Models/Notification';
import { object } from 'prop-types';
import * as Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

interface IProps {
  notifications: Notification[];
}

class NoSideBarLayoutComponent extends Component<IProps> {
  public static contextTypes = {
    store: object,
  };

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { notifications } = this.props;

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
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

export const NoSideBarLayout = connect((state: IApplicationState) => ({
  notifications: state.notifications,
}))(NoSideBarLayoutComponent);
