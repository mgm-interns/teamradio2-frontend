import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux';
import { Dispatch } from 'Configuration/Redux';
import { FavoriteSong, PlaylistSong } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { updateNewestFavoriteList } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { UserServices } from 'Services/Http/UserServices';
import { StationPlaylistSSEService } from 'Services/SSE';
import { Favorite } from './Favorite';
import { History } from './History';
import { Playlist } from './Playlist';
import './PlaylistTabs.scss';

const PLAYLIST_TAB_ID = '1';
const HISTORY_TAB_ID = '2';
const FAVOURITE_TAB_ID = '3';

interface IReduxProps {
  playlist: PlaylistSong[];
}

interface IOwnProps {
  stationId: string;
}

interface IDispatcherProps {
  updateNewestFavoriteList: (favoriteList: FavoriteSongItem[]) => void;
}

interface IStates {
  activeTab: string;
  favoriteList: FavoriteSongItem[];
}

type IProps = IOwnProps & IDispatcherProps & IReduxProps;

export class PlaylistTabsComponent extends BaseComponent<IProps, IStates> {
  @Inject('StationPlaylistSSEService')
  private stationPlaylistSSEService: StationPlaylistSSEService;
  @Inject('UserServices') private userServices: UserServices;
  constructor(props: IProps) {
    super(props);
    this.state = {
      favoriteList: [],
      activeTab: PLAYLIST_TAB_ID,
    };
  }

  public componentWillMount() {
    this.getListFavorite();
  }

  public componentDidMount() {
    const { stationId } = this.props;
    this.startSSEService(stationId);
  }

  public componentWillUnmount() {
    this.stationPlaylistSSEService.close();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stationId: oldStationId } = this.props;
    const { stationId: nextStationId } = nextProps;

    if (oldStationId !== nextStationId) {
      // Close old SSE instance
      this.stationPlaylistSSEService.close();
      // Open new instance
      this.startSSEService(nextStationId);
    }
  }

  public render() {
    const { playlist, stationId } = this.props;
    return (
      <div className="tabs-container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === PLAYLIST_TAB_ID ? 'active' : ''
              }
              onClick={() => this.openTab(PLAYLIST_TAB_ID)}>
              Playlist {playlist.length ? `(${playlist.length})` : null}
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
            <Playlist playlist={playlist} stationId={stationId} />
          </TabPane>
          <TabPane tabId={HISTORY_TAB_ID}>
            <History
              stationId={stationId}
              isActive={this.state.activeTab === HISTORY_TAB_ID}
            />
          </TabPane>
          <TabPane tabId={FAVOURITE_TAB_ID}>
            <Favorite stationId={stationId} />
          </TabPane>
        </TabContent>
      </div>
    );
  }

  private startSSEService(stationId: string) {
    this.stationPlaylistSSEService.initiate(stationId);
    this.stationPlaylistSSEService.start();
  }

  private openTab = (tabId: any) => {
    if (this.state.activeTab === tabId) {
      return;
    }

    this.setState({
      activeTab: tabId,
    });
  };

  private getListFavorite = () => {
    if (!this.isLoggedIn()) {
      return;
    }
    this.userServices.getListMyFavorite().subscribe(
      (res: FavoriteSong[]) => {
        this.props.updateNewestFavoriteList(res);
        this.setState({
          favoriteList: res,
        });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNewestFavoriteList: (favoriteList: FavoriteSongItem[]) =>
    dispatch(updateNewestFavoriteList(favoriteList)),
});

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  playlist: state.playlist.playlist,
});

export const PlaylistTabs = connect<IReduxProps, IDispatcherProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistTabsComponent);
