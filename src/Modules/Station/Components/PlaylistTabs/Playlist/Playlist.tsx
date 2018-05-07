import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjector';
import { IApplicationState } from 'Configuration/Redux';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { PlaylistSong } from 'Models/Song';
import * as React from 'react';
import FlipMoveList from 'react-flip-move';
import { connect } from 'react-redux';
import { SongServices, UserServices } from 'Services/Http';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistProps {
  playlist: PlaylistSong[];
  stationId: string;
}

interface IReduxProps {
  favoriteList: FavoriteSongItem[];
}

type IOwnProps = IPlaylistProps;

interface IStates {
  playlist: PlaylistSong[];
  votingError: string;
  favoriteList: FavoriteSongItem[];
}

type IProps = IPlaylistProps & IReduxProps;

export class PlaylistComponent extends BaseComponent<IProps, IStates> {
  @Inject('UserServices') private userServices: UserServices;
  @Inject('SongServices') private songServices: SongServices;

  constructor(props: IProps) {
    super(props);

    this.state = {
      playlist: props.playlist,
      votingError: '',
      favoriteList: this.props.favoriteList,
    };
  }

  public upVote = (songId: string) => {
    const { stationId } = this.props;

    this.songServices.upVote(stationId, songId).subscribe(
      response => {},
      (err: string) => {
        this.setState({ votingError: err });
        this.showError(err);
      },
    );
  };

  public downVote = (songId: string) => {
    const { stationId } = this.props;

    this.songServices.downVote(stationId, songId).subscribe(
      response => {},
      (err: string) => {
        this.setState({ votingError: err });
        this.showError(err);
      },
    );
  };

  public addSong(song: any) {
    this.setState(prevState => {
      return {
        playlist: [song, ...prevState.playlist],
      };
    });
  }

  public isFavorited(
    playlistItem: PlaylistSong,
    favoriteList: FavoriteSongItem[],
  ) {
    return favoriteList.some(item => item.songId === playlistItem.songId);
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
    const { playlist } = this.props;
    if (playlist.length === 0) {
      return (
        <div className="playlist-none">
          <i className="fa fa-warning" />
          <h5>
            There is no song in the playlist.
            <br />
            Add a new song to start your station.
          </h5>
        </div>
      );
    }

    return (
      <div className="playlist">
        <FlipMoveList className="flip-move-playlist">
          {playlist.map((song, index) => {
            return (
              <PlaylistItem
                key={song.id || index}
                {...song}
                song={song}
                upVote={(songId: string) => {
                  this.upVote(songId);
                }}
                downVote={(songId: string) => {
                  this.downVote(songId);
                }}
                votingError={this.state.votingError}
                isFavorite={this.isFavorited(song, this.state.favoriteList)}
              />
            );
          })}
        </FlipMoveList>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Playlist = connect<IReduxProps, {}, IOwnProps>(mapStateToProps)(
  PlaylistComponent,
);
