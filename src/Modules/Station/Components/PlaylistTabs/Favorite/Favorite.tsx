import { BaseComponent } from 'BaseComponent';
import { inject } from 'Configuration/DI';
import { IApplicationState } from 'Configuration/Redux';
import { Song } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import * as React from 'react';
import { connect } from 'react-redux';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { FavoriteItem } from './FavoriteItem';

interface IOwnProps {
  stationId: string;
}

interface IStateProps {
  favoriteList: FavoriteSongItem[];
}

interface IDispatcherProps {}

type IProps = IOwnProps & IStateProps & IDispatcherProps;

interface IStates {
  favoriteList: FavoriteSongItem[];
}

export class FavoriteComponent extends BaseComponent<IProps, IStates> {
  @inject('SongServices') private songServices: SongServices;

  constructor(props: IProps) {
    super(props);

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public replaySong = (youtubeVideoId: string, message: string) => {
    const { stationId } = this.props;
    this.songServices.addSong(stationId, youtubeVideoId, message).subscribe(
      (songResponse: Song) => {},
      (err: string) => {
        this.showError(`Replay song error: ${err}`);
      },
    );
  };

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.favoriteList !== nextProps.favoriteList) {
      const favoriteList = nextProps.favoriteList;
      this.setState({
        favoriteList,
      });
    }
  }

  public render() {
    const { favoriteList } = this.state;
    if (favoriteList.length === 0) {
      return (
        <div className="playlist-none">
          <i className="fa fa-warning" />
          <h5>
            You don't have any favourite songs
            <br />
            You can add some songs you like from playlist tab.
          </h5>
        </div>
      );
    }
    return (
      <div className="list-container">
        {favoriteList.map((favorite: FavoriteSongItem, index: number) => {
          return (
            <FavoriteItem
              key={index}
              {...favorite}
              replaySong={this.replaySong}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Favorite = connect<IStateProps, IDispatcherProps, IOwnProps>(
  mapStateToProps,
)(FavoriteComponent);
