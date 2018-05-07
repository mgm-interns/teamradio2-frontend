import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { YoutubeHelper } from 'Helpers';
import { Song } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { removeFavorite } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { UserServices } from 'Services/Http/UserServices';
import './FavoriteItem.scss';

interface IDispatcherProps {
  removeFavorite: (songId: string) => void;
}

type IOwnProps = FavoriteSongItem;

type IProps = IOwnProps & IDispatcherProps;

interface IFavoriteItemStates {
  song: Song;
}

export class FavoriteItemComponent extends BaseComponent<
  IProps,
  IFavoriteItemStates
> {
  @Inject('UserServices') private userServices: UserServices;
  constructor(props: IOwnProps & IDispatcherProps) {
    super(props);

    this.processDelete = this.processDelete.bind(this);
    this.state = {
      song: this.props.song,
    };
  }

  public processDelete() {
    const result = confirm('Do you want to delete this favorite song?');
    if (result) {
      this.deleteFavoriteItem();
    }
  }

  public deleteFavoriteItem() {
    return this.userServices.removeFavorite(this.props.song.songId).subscribe(
      (res: {}) => {
        this.props.removeFavorite(this.props.song.songId);
      },
      (err: any) => {
        console.log(`Error when create: ${err}`);
      },
    );
  }

  public render() {
    const { song } = this.props;
    return (
      <div className="favorite-song-item my-flex-item">
        <div className="favorite-song-item-transition">
          <div className="trash-favorite-song">
            <a href="#" onClick={this.processDelete}>
              <span className="w3-jumbo w3-teal ">
                <i className="fa fa-trash trash-size" />
              </span>
            </a>
          </div>
          <div className="img-transition" />
        </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeFavorite: (songId: string) => dispatch(removeFavorite(songId)),
});

export const FavoriteItem = connect<{}, IDispatcherProps, IOwnProps>(
  null,
  mapDispatchToProps,
)(FavoriteItemComponent);
