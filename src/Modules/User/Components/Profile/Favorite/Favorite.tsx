import { BaseComponent } from 'BaseComponent';
import { Dispatch, IApplicationState } from 'Configuration/Redux';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { updateNewestFavoriteList } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { UserServices } from 'Services/Http';
import './Favorite.scss';
import { FavoriteItem } from './FavoriteItem';

interface IOwnStates {
  favoriteList: FavoriteSongItem[];
}

interface IReduxProps {
  favoriteList: FavoriteSongItem[];
}

interface IDispatcherProps {
  updateNewestFavoriteList: (favoriteList: FavoriteSongItem[]) => void;
}

class FavoriteComponent extends BaseComponent<
  IReduxProps & IDispatcherProps,
  IOwnStates
> {
  private userServices: UserServices;
  constructor(props: IReduxProps & IDispatcherProps) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      favoriteList: [],
    };
  }

  public componentDidMount() {
    this.getListFavoriteSong();
  }

  public getListFavoriteSong() {
    this.userServices.getListMyFavorite().subscribe(
      (favoriteSongItem: FavoriteSongItem[]) => {
        this.props.updateNewestFavoriteList(favoriteSongItem);
        this.setState({
          favoriteList: favoriteSongItem,
        });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  public componentWillReceiveProps(nextProps: IReduxProps) {
    if (this.props.favoriteList !== nextProps.favoriteList) {
      const favoriteList = nextProps.favoriteList;
      this.setState({
        favoriteList,
      });
    }
  }

  public render() {
    return (
      <div>
        <h2 className="title-header pd-left-15">
          Hear the tracks you've saved
        </h2>
        <div className="d-flex flex-row flex-wrap my-flex-container pd-left-15">
          {this.state.favoriteList.map(
            (item: FavoriteSongItem, index: number) => {
              return <FavoriteItem key={index} {...item} />;
            },
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNewestFavoriteList: (favoriteList: FavoriteSongItem[]) =>
    dispatch(updateNewestFavoriteList(favoriteList)),
});

const mapStateToProps = (state: IApplicationState): IOwnStates => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Favorite = connect<IReduxProps, IDispatcherProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteComponent);
