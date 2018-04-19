import { BaseComponent } from 'BaseComponent';
import * as React from 'react';
import '../PlaylistTabs.scss';
import { FavouriteItem } from './FavouriteItem';

interface IFavouriteProps {
  favouriteList: any[];
}

export class Favourite extends BaseComponent<IFavouriteProps, IFavouriteProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      favouriteList: props.favouriteList,
    };
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.favouriteList.map((song, index) => (
          <FavouriteItem key={index} song={song} />
        ))}
      </div>
    );
  }

  public addSongToFavourite(song: any) {
    const oldFavourite = this.state.favouriteList.slice(0);
    this.setState({
      favouriteList: [song, ...oldFavourite],
    });
  }
}
