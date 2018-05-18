import { reduceByCharacters } from 'Helpers/TextHelper';
import { RegisteredUser } from 'Models/User';
import { UserStationsBrowser } from 'Modules/User/Components/Profile/MyStationsBrowser';
import { UserRecentStationsBrowser } from 'Modules/User/Components/Profile/RecentStationsBrowser';
import * as React from 'react';
import { Col, Nav, Row, TabContent, TabPane } from 'reactstrap';
import { ProfileNavBar } from './ProfileNavBar';

const STATION_TAB_ID = '1';

interface IProps {
  userId: string;
}

interface IStates {
  userInfo: RegisteredUser;
  isLoadingUserInfo: boolean;
}

export class PublicProfileNavBar extends ProfileNavBar<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: STATION_TAB_ID,
      userInfo: null,
      isLoadingUserInfo: true,
    };
  }

  public componentWillMount() {
    this.setState({ isLoadingUserInfo: true });
    this.getUserInfo();
  }

  public getUserInfo() {
    this.userServices.getUserProfile(this.props.userId).subscribe(
      (userInfo: RegisteredUser) => {
        this.setState({ userInfo, isLoadingUserInfo: false });
      },
      error => {},
    );
  }

  public renderNavBar() {
    return (
      <Row>
        <Col sm={12} className="pd-0">
          <Nav tabs>{this.renderStationTab()}</Nav>
        </Col>
      </Row>
    );
  }

  public renderTabContent() {
    if (this.state.isLoadingUserInfo) {
      return <div />;
    }
    return (
      <Row>
        <TabContent className={'profile-tab-content'}>
          <TabPane>
            <h2 className="title-header pd-left-15">
              {this.state.userInfo
                ? reduceByCharacters(this.state.userInfo.name) + "'s station"
                : ''}
            </h2>
            <UserStationsBrowser userInfo={this.state.userInfo} />
            <h2 className="title-header pd-left-15">Recent</h2>
            <UserRecentStationsBrowser userInfo={this.state.userInfo} />
          </TabPane>
        </TabContent>
      </Row>
    );
  }
}
