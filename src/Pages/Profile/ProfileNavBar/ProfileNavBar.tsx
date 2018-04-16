import * as React from 'react';
import { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import {favouriteList, historyList, playlist} from "../../../Modules/Station/Components/PlaylistTabs/fixture";
import {Playlist} from "../../../Modules/Station/Components/PlaylistTabs/Playlist";
import { SelectFormButton } from './SelectFormButton';

const STATION_TAB_ID = '1';
const FAVORITE_SONG_TAB_ID = '2';

export class ProfileNavBar extends Component<any, any> {
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
    return (
      <Container>
        <Row>
          <div className="col-sm-11">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={
                    this.state.activeTab === STATION_TAB_ID ? 'active' : ''
                  }
                  onClick={() => this.openTab(STATION_TAB_ID)}>
                  Stations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    this.state.activeTab === FAVORITE_SONG_TAB_ID ? 'active' : ''
                  }
                  onClick={() => this.openTab(FAVORITE_SONG_TAB_ID)}>
                  Favorite Songs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={STATION_TAB_ID}>
                <Playlist playlist={playlist} />
              </TabPane>
              <TabPane tabId={FAVORITE_SONG_TAB_ID}>
                {/*<History historyList={historyList} />*/}
              </TabPane>
            </TabContent>
          </div>
          <div className="col-sm-1">
            <SelectFormButton />
          </div>
        </Row>
      </Container>
    );
  }
}
