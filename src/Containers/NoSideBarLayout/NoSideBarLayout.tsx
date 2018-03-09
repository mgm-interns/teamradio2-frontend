import * as React from 'react';
import { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { CustomHeader, Breadcrumb, Footer } from '../../Components/';

import { Home } from '../../Pages/';

export class NoSideBarLayout extends Component {
  render() {
    return (
      <div className="app">
        <CustomHeader/>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                <Route path="/" name="Home" component={Home}/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}
