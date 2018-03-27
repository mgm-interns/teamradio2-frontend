import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';

// config redux
import { Provider } from 'react-redux';
import { configureStore } from './Configuration/Redux';

// Containers
import { FullLayout, NoSideBarLayout } from './Containers/';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" name="Dashboard" component={FullLayout}/>
        <Route path="/" name="Home" component={NoSideBarLayout}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
