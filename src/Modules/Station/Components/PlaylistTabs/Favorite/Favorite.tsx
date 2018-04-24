import { BaseComponent } from 'BaseComponent';
import { IApplicationState } from 'Configuration/Redux';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import * as React from 'react';
import { connect } from 'react-redux';
import '../PlaylistTabs.scss';
import { FavoriteItem } from './FavoriteItem';

interface IReduxProps {
  favoriteList: FavoriteSongItem[];
}

interface IFavoriteStates {
  favoriteList: FavoriteSongItem[];
}

export class FavoriteComponent extends BaseComponent<
  IReduxProps,
  IFavoriteStates
> {
  constructor(props: IReduxProps) {
    super(props);

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public componentWillReceiveProps(nextProps: IReduxProps) {
    const favoriteList = nextProps.favoriteList;
    this.setState({
      favoriteList,
    });
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.favoriteList.map(
          (favorite: FavoriteSongItem, index: number) => {
            return <FavoriteItem key={index} {...favorite} />;
          },
        )}
      </div>
    );
  }

  public addSongToFavourite(song: any) {
    const oldFavourite = this.state.favoriteList.slice(0);
    this.setState({
      favoriteList: [song, ...oldFavourite],
    });
  }
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Favorite = connect<IReduxProps, {}, {}>(mapStateToProps)(
  FavoriteComponent,
);
