import * as React from 'react';
import { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { SelectFormButton } from './SelectFormButton';

export class ProfileNavBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Container>
        <Row>
          <div className="col-sm-11">
            <Nav tabs>
              <NavItem>
                <NavLink
                  href="#"
                  active={this.props.isOpenStation}
                  onClick={() => {
                    this.props.openStationTab();
                  }}>
                  Stations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={this.props.isOpenFavouriteSong}
                  onClick={() => {
                    this.props.openFavouriteSongTab();
                  }}>
                  Favourite Songs
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="col-sm-1">
            <SelectFormButton />
          </div>
        </Row>
      </Container>
    );
  }
}
