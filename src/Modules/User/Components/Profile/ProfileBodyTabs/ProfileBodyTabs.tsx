import { FavoriteSong } from 'Models/FavoriteSong';
import { SelectFormButton } from 'Pages/Profile/ProfileNavBar/SelectFormButton';
import { Component } from 'react';
import * as React from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import { UserServices } from 'Services/Http/UserServices';
import { Favorite } from './Favorite';
import { IFavoriteItem } from './Favorite/FavoriteItem';
import './ProfileBodyTabs.scss';

const STATION_TAB_ID = '1';
const FAVORITE_TAB_ID = '2';

interface IProfileBodyTabsStates {
  activeTab: string;
  favoriteList: IFavoriteItem[];
}

export class ProfileBodyTabs extends Component<{}, IProfileBodyTabsStates> {
  private userServices: UserServices;
  constructor(props: any) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      activeTab: STATION_TAB_ID,
      favoriteList: [],
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

  public componentWillMount() {
    this.getListFavoriteSong();
  }

  public convertFavouriteToIFavoriteItem(item: FavoriteSong): IFavoriteItem {
    return {
      userId: item.userId,
      songId: item.songId,
      song: item.song,
    };
  }

  public getListFavoriteSong() {
    this.userServices.getListFavorite().subscribe(
      (res: FavoriteSong[]) => {
        const favoriteList: IFavoriteItem[] = res.map(
          this.convertFavouriteToIFavoriteItem,
        );
        this.setState({
          favoriteList,
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }
  public render() {
    return (
      <Container>
        <Row>
          <div className="col-10 pd-0">
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
                    this.state.activeTab === FAVORITE_TAB_ID ? 'active' : ''
                  }
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
          <TabContent
            className={'profile-tab-content'}
            activeTab={this.state.activeTab}>
            <TabPane tabId={STATION_TAB_ID}>
              {/*<Favorite favouriteList={this.state.favoriteList}/>*/}
            </TabPane>
            <TabPane tabId={FAVORITE_TAB_ID}>
              <Favorite favoriteList={this.state.favoriteList} />
            </TabPane>
          </TabContent>
        </Row>
      </Container>
    );
  }
}
