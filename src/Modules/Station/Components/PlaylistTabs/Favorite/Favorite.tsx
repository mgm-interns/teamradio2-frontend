import { IApplicationState } from 'Configuration/Redux';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import '../PlaylistTabs.scss';
import { FavoriteItem, IFavoriteItem } from './FavoriteItem';

interface IFavoriteProps {
  favoriteList: IFavoriteItem[];
}

interface IFavoriteStates {
  favoriteList: IFavoriteItem[];
}

export class FavoriteComponent extends Component<
  IFavoriteProps,
  IFavoriteStates
> {
  constructor(props: any) {
    super(props);

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public componentWillReceiveProps(nextProps: IFavoriteProps) {
    if (this.props.favoriteList !== nextProps.favoriteList) {
      const favoriteList = nextProps.favoriteList;
      this.setState({
        favoriteList,
      });
    }
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.favoriteList.map((favorite: IFavoriteItem, index: number) => {
          return <FavoriteItem key={index} {...favorite} />;
        })}
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

const mapStateToProps = (state: IApplicationState): IFavoriteProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Favorite = connect<any, any, any>(mapStateToProps)(
  FavoriteComponent,
);
