import { BaseComponent } from 'BaseComponent';
import { IApplicationState } from 'Configuration/Redux';
import { Song } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import * as React from 'react';
import { connect } from 'react-redux';
import {SongServices} from "../../../../../Services/Http";
import '../PlaylistTabs.scss';
import { FavoriteItem } from './FavoriteItem';

interface IReduxProps {
  favoriteList: FavoriteSongItem[];
}

interface IOwnProps {
  stationId: string;
}
type IProps = IReduxProps & IOwnProps;

interface IFavoriteStates {
  favoriteList: FavoriteSongItem[];
}

export class FavoriteComponent extends BaseComponent<IProps, IFavoriteStates> {
  private songServices: SongServices;
  constructor(props: IProps) {
    super(props);
    this.state = {
      favoriteList: props.favoriteList,
    };
    this.songServices = new SongServices();
    this.replaySong = this.replaySong.bind(this);
  }

  public replaySong(youtubeVideoId: string, message: string) {
    const { stationId } = this.props;
    this.songServices.addSong(stationId, youtubeVideoId, message).subscribe(
      (songResponse: Song) => {},
      (err: string) => {
        this.showError(`Replay song error: ${err}`);
      },
    );
  }

  public componentWillReceiveProps(nextProps: IProps) {
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
        {this.state.favoriteList.map(
          (favorite: FavoriteSongItem, index: number) => {
            return <FavoriteItem key={index} {...favorite} replaySong={this.replaySong} />;
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

export const Favorite = connect<IReduxProps, {}, IOwnProps>(mapStateToProps)(
  FavoriteComponent,
);
