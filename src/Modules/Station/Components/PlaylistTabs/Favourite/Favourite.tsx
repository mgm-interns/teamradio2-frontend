import * as React from 'react';
import { Component } from 'react';
import '../PlaylistTabs.scss';
import { FavouriteItem } from './FavouriteItem';

interface IFavouriteProps {
  favouriteList: Array<any>;
}

export class Favourite extends Component<IFavouriteProps, any> {
  public render() {
    return (
      <div className="list-container">
        {this.props.favouriteList.map((song, index) => (
          <FavouriteItem key={index} song={song} />
        ))}
      </div>
    );
  }
}
