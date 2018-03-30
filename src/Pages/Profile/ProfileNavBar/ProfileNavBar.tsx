import * as React from 'react';
import { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { SelectFormButton } from './SelectFormButton';

export class ProfileNavBar extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpenStation: true,
      isOpenFavouriteSong: false,
    };
  }

  public openStationTab() {
    this.setState({
      isOpenStation: true,
      isOpenFavouriteSong: false,
    });
  }

  public openFavouriteSongTab() {
    this.setState({
      isOpenStation: false,
      isOpenFavouriteSong: true,
    });
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
                  active={this.state.isOpenStation}
                  onClick={() => {
                    this.openStationTab();
                  }}>
                  Stations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={this.state.isOpenFavouriteSong}
                  onClick={() => {
                    this.openFavouriteSongTab();
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
