import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { WithLoadable } from 'Containers/WithLoadable';
// import NoSideBarLayout from 'Containers';

export default () => (
  <BrowserRouter>
  <Switch>
  {/* <Route
   path="/dashboard"
     name="Dashboard"
     component={WithLoadable(() => import('Containers/FullLayout'))}
   />, */}
    <Route
      exact
      path="/"
      name="Home"
      component={WithLoadable(() => import('Containers/NoSideBarLayout'))}
    />
  </Switch>
  // </BrowserRouter>
);
