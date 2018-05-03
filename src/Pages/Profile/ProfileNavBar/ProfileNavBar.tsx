import {
  Favorite,
  MyStationsBrowser,
  RecentStationsBrowser,
} from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
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
          <Col sm={11} xs={10} className="pd-0">
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
          </Col>
          <Col sm={1} xs={2} className="pd-0">
            <SelectFormButton />
          </Col>
        </Row>
        <Row>
          <TabContent className={'profile-tab-content'} activeTab={activeTab}>
            <TabPane tabId={STATION_TAB_ID}>
              <h2 className="title-header pd-left-15">My stations</h2>
              <MyStationsBrowser />
              <h2 className="title-header pd-left-15">Recent</h2>
              <RecentStationsBrowser />
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
