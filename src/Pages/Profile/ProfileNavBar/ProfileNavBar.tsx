import { BaseComponent } from 'BaseComponent';
import { RegisteredUser } from 'Models/User';
import {
  Favorite,
  MyRecentStationsBrowser,
  MyStationsBrowser,
} from 'Modules/User';
import * as React from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap';
import { UserServices } from 'Services/Http/UserServices';
import './ProfileNavBar.scss';
import { SelectFormButton } from './SelectFormButton';

const STATION_TAB_ID = '1';
const FAVORITE_TAB_ID = '2';

interface IProfileNavBarStates {
  activeTab: string;
  userInfo: RegisteredUser;
  isLoadingUserInfo?: boolean;
}

export class ProfileNavBar<P, S> extends BaseComponent<
  P,
  IProfileNavBarStates
> {
  protected userServices: UserServices;
  constructor(props: P) {
    super(props);
    this.state = {
      activeTab: STATION_TAB_ID,
      userInfo: null,
    };
    this.userServices = new UserServices();
  }

  public openTab(tabId: string) {
    if (this.state.activeTab === tabId) {
      return;
    }

    this.setState({
      activeTab: tabId,
    });
  }

  public renderStationTab() {
    const { activeTab } = this.state;
    return (
      <NavItem>
        <NavLink
          className={activeTab === STATION_TAB_ID ? 'active' : ''}
          onClick={() => this.openTab(STATION_TAB_ID)}>
          Stations
        </NavLink>
      </NavItem>
    );
  }

  public renderFavoriteTab() {
    const { activeTab } = this.state;
    return (
      <NavItem>
        <NavLink
          className={activeTab === FAVORITE_TAB_ID ? 'active' : ''}
          onClick={() => this.openTab(FAVORITE_TAB_ID)}>
          Favorite Songs
        </NavLink>
      </NavItem>
    );
  }

  public renderSelectFormButton() {
    return <SelectFormButton />;
  }

  public renderNavBar() {
    return (
      <Row>
        <Col sm={11} xs={10} className="pd-0">
          <Nav tabs>
            {this.renderStationTab()}
            {this.renderFavoriteTab()}
          </Nav>
        </Col>
        <Col sm={1} xs={2} className="pd-0">
          {this.renderSelectFormButton()}
        </Col>
      </Row>
    );
  }

  public renderTabContent() {
    const { activeTab } = this.state;
    return (
      <Row>
        <TabContent className={'profile-tab-content'} activeTab={activeTab}>
          <TabPane tabId={STATION_TAB_ID}>
            <h2 className="title-header pd-left-15">My station</h2>
            <MyStationsBrowser />
            <h2 className="title-header pd-left-15">Recent</h2>
            <MyRecentStationsBrowser />
          </TabPane>
          <TabPane tabId={FAVORITE_TAB_ID}>
            <Favorite />
          </TabPane>
        </TabContent>
      </Row>
    );
  }

  public render() {
    return (
      <Container>
        {this.renderNavBar()}
        {this.renderTabContent()}
      </Container>
    );
  }
}
