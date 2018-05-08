import * as React from 'react';
import { Col, Nav, Row } from 'reactstrap';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import { RegisteredUser } from '../../../Models/User';
import { UserStationsBrowser } from '../../../Modules/User/Components/Profile/MyStationsBrowser';
import { UserRecentStationsBrowser } from '../../../Modules/User/Components/Profile/RecentStationsBrowser';
import { ProfileNavBar } from './ProfileNavBar';

interface IProps {
  userId: string;
}

interface IStates {
  userInfo: RegisteredUser;
}

export class PublicProfileNavBar extends ProfileNavBar<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: '1',
      userInfo: null,
    };
  }

  public componentWillMount() {
    this.getUserInfo();
  }

  public getUserInfo() {
    this.userServices.getUserProfile(this.props.userId).subscribe(
      (userInfo: RegisteredUser) => {
        this.setState({ userInfo });
      },
      error => {
        this.showError(error);
      },
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
    return (
      <Row>
        <TabContent className={'profile-tab-content'}>
          <TabPane>
            <h2 className="title-header pd-left-15">
              {this.state.userInfo
                ? this.state.userInfo.name + "'s station"
                : ''}
            </h2>
            <UserStationsBrowser userId={this.props.userId} />
            <h2 className="title-header pd-left-15">Recent</h2>
            <UserRecentStationsBrowser userId={this.props.userId} />
          </TabPane>
        </TabContent>
      </Row>
    );
  }
}
