import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
// import 'simple-line-icons/css/simple-line-icons.css';
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';
// Import Main styles for this application
import '../scss/style.scss';

// config redux
import { Provider } from 'react-redux';
import { configureStore } from './Configuration/Redux';

// Containers
import { FullLayout, NoSideBarLayout } from './Containers/';

// const AsyncApp = Loadable({
//   loader: () => import('Containers/App'),
//   loading: (): any => null,
// });

const store = configureStore();

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" name="Dashboard" component={FullLayout} />
          <Route path="/" name="Home" component={NoSideBarLayout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

// const renderApp = (Component: React.ComponentType) => {
//   ReactDOM.render(
//     <HashRouter>
//       <Provider store={store}>
//         <Component />
//       </Provider>
//     </HashRouter>,
//     document.getElementById('root'),
//   );
// };

// renderApp(AsyncApp);
