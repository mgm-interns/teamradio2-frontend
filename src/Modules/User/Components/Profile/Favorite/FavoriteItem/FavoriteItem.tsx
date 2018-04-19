import { BaseComponent } from 'BaseComponent';
import { YoutubeHelper } from 'Helpers';
import { Song } from 'Models';
import * as React from 'react';
import './FavoriteItem.scss';

export interface IFavoriteItem {
  song: Song;
}

interface IFavoriteItemStates {}

export class FavoriteItem extends BaseComponent<
  IFavoriteItem,
  IFavoriteItemStates
> {
  constructor(props: IFavoriteItem) {
    super(props);
  }

  public render() {
    const { song } = this.props;
    return (
      <div className="favorite-song-item my-flex-item">
        <div className="trash-favorite-song">
          <a href="#">
            <span className="w3-jumbo w3-teal ">
              <i className="fa fa-trash trash-size" />
            </span>
          </a>
        </div>
        <div className="img-transition" />
        <div className="duration">
          {YoutubeHelper.convertDuration(song.duration)}
        </div>
        <div className="favorite-song-thumbnail">
          <img src={song.thumbnail} />
        </div>
        <div className="favorite-song-name">{song.title}</div>
      </div>
    );
  }
}
