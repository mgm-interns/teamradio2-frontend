import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch, IApplicationState } from 'Configuration/Redux';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { updateNewestFavoriteList } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs/Subscription';
import { HttpServices, IServerError, UserServices } from 'Services/Http';
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
  @Inject('UserServices') private userServices: UserServices;
  private getListMyFavoriteSub: Subscription;

  constructor(props: IReduxProps & IDispatcherProps) {
    super(props);

    this.state = {
      favoriteList: [],
    };
  }

  public componentDidMount() {
    this.getListFavoriteSong();
  }

  public getListFavoriteSong() {
    this.getListMyFavoriteSub = this.userServices.getListMyFavorite().subscribe(
      (favoriteSongItem: FavoriteSongItem[]) => {
        this.props.updateNewestFavoriteList(favoriteSongItem);
        this.setState({
          favoriteList: favoriteSongItem,
        });
      },
      (err: IServerError) => {
        // Only for development
        // this.showError(HttpServices.getServerErrorMessage(err));
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

  public componentWillUnmount() {
    this.cancelSubscription();
  }

  public renderFavoriteListEmpty() {
    return (
      <div className="favorite-empty">
        <i className="fa fa-exclamation-triangle empty-warning" />
        <p>There is no song in your list.</p>
        <p>Please favorite any song.</p>
      </div>
    );
  }

  public renderFavoriteList() {
    return (
      <div className="d-flex flex-row flex-wrap my-flex-container pd-left-15">
        {this.state.favoriteList.map(
          (item: FavoriteSongItem, index: number) => {
            return <FavoriteItem key={index} {...item} />;
          },
        )}
      </div>
    );
  }

  public render() {
    return (
      <div>
        <h2 className="title-header pd-left-15">
          Hear the tracks you've saved
        </h2>
        {this.state.favoriteList.length === 0
          ? this.renderFavoriteListEmpty()
          : this.renderFavoriteList()}
      </div>
    );
  }

  private cancelSubscription() {
    if (this.getListMyFavoriteSub) {
      this.getListMyFavoriteSub.unsubscribe();
    }
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
