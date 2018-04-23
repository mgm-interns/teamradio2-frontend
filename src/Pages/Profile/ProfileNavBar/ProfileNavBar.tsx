import { Favorite, MyStationsBrowser } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap';
import './ProfileNavBar.scss';
import { SelectFormButton } from './SelectFormButton';

const STATION_TAB_ID = '1';
const FAVORITE_TAB_ID = '2';

interface IProfileNavBarStates {
  activeTab: string;
}

export class ProfileNavBar extends Component<{}, IProfileNavBarStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: STATION_TAB_ID,
    };
  }

  public openTab(tabId: any) {
    if (this.state.activeTab === tabId) {
      return;
    }

    this.setState({
      activeTab: tabId,
    });
  }

  public render() {
    const { activeTab } = this.state;
    return (
      <Container>
        <Row>
          <div className="col-10 pd-0">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === STATION_TAB_ID ? 'active' : ''}
                  onClick={() => this.openTab(STATION_TAB_ID)}>
                  Stations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === FAVORITE_TAB_ID ? 'active' : ''}
                  onClick={() => this.openTab(FAVORITE_TAB_ID)}>
                  Favorite Songs
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="col-2 pd-0">
            <SelectFormButton />
          </div>
        </Row>
        <Row>
          <TabContent className={'profile-tab-content'} activeTab={activeTab}>
            <TabPane tabId={STATION_TAB_ID}>
              <h2 className="title-header pd-left-15">
                My stations
              </h2>
              <MyStationsBrowser />
            </TabPane>
            <TabPane tabId={FAVORITE_TAB_ID}>
              <Favorite />
            </TabPane>
          </TabContent>
        </Row>
      </Container>
    );
  }
}
