import * as React from 'react';
import { Component } from 'react';
import './Favorite.scss';
import { FavoriteItem, IFavoriteItem } from './FavoriteItem';

interface IFavoriteProps {
  favoriteList: IFavoriteItem[];
}

interface IFavoriteStates {
  favoriteList: IFavoriteItem[];
}

export class Favorite extends Component<IFavoriteProps, IFavoriteStates> {
  constructor(props: IFavoriteProps) {
    super(props);

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public render() {
    return (
      <div>
        <h2 className="title-header">Hear the tracks you've saved</h2>
        <div className="d-flex flex-row flex-wrap my-flex-container pd-left-15">
          {this.props.favoriteList.map((item: IFavoriteItem, index: number) => {
            return <FavoriteItem key={index} {...item} />;
          })}
        </div>
      </div>
    );
  }
}
