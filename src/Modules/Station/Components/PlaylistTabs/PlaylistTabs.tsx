import { IApplicationState } from 'Configuration/Redux';
import { Song } from 'Models/Song';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { StationPlaylistSSE } from 'Services/SSE';
import { Favourite } from './Favourite';
import { favouriteList, historyList } from './fixture';
import { History } from './History';
import { Playlist } from './Playlist';
import './PlaylistTabs.scss';

const PLAYLIST_TAB_ID = '1';
const HISTORY_TAB_ID = '2';
const FAVOURITE_TAB_ID = '3';

interface IStateProps {
  playlist: Song[];
}

interface IOwnProps {
  stationId: string;
}

type IProps = IStateProps & IOwnProps;

interface IState {
  activeTab: string;
}

export class PlaylistTabsComponent extends Component<IProps, IState> {
  private stationPlaylistSSE: StationPlaylistSSE;

  constructor(props: any) {
    super(props);

    this.state = {
      activeTab: PLAYLIST_TAB_ID,
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

  public componentDidMount() {
    const { stationId } = this.props;
    this.startSSEService(stationId);
  }

  public componentWillUnmount() {
    this.stationPlaylistSSE.close();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stationId: oldStationId } = this.props;
    const { stationId: nextStationId } = nextProps;

    if (oldStationId !== nextStationId) {
      // Close old SSE instance
      this.stationPlaylistSSE.close();
      // Open new instance
      this.startSSEService(nextStationId);
    }
  }

  public render() {
    const { playlist } = this.props;
    return (
      <div className="tabs-container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === PLAYLIST_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(PLAYLIST_TAB_ID)}>
              Playlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === HISTORY_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(HISTORY_TAB_ID)}>
              History
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === FAVOURITE_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(FAVOURITE_TAB_ID)}>
              Favourite
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={PLAYLIST_TAB_ID}>
            <Playlist playlist={playlist} />
          </TabPane>
          <TabPane tabId={HISTORY_TAB_ID}>
            <History historyList={historyList} />
          </TabPane>
          <TabPane tabId={FAVOURITE_TAB_ID}>
            <Favourite favouriteList={favouriteList} />
          </TabPane>
        </TabContent>
      </div>
    );
  }

  private startSSEService(stationId: string) {
    this.stationPlaylistSSE = new StationPlaylistSSE(stationId);
    this.stationPlaylistSSE.start();
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  playlist: state.playlist.playlist,
});

export const PlaylistTabs = connect<IStateProps, {}, IOwnProps>(
  mapStateToProps,
  null,
)(PlaylistTabsComponent);
