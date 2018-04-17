import { Song } from 'Models/Song';
import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import { UserServices } from 'Services/Http/UserServices';
import { SongServices } from 'Services/Http';
import { IFavouriteItem } from '../Favourite/FavouriteItem';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistProps {
  playlist: any[];
  stationId: String;
}

interface IFavoriteListProps {
  favoriteList: IFavouriteItem[];
}

interface IStates {
  playlist: any[];
  votingError: string;
}

type Iprops = IPlaylistProps & IFavoriteListProps;

export class Playlist extends Component<Iprops, IStates> {
  private userServices: UserServices;
  private songServices: SongServices;

  constructor(props: Iprops) {
    super(props);

    this.userServices = new UserServices();
    this.songServices = new SongServices();

    this.state = {
      playlist: props.playlist,
      votingError: '',
    };
  }

  public upVote = (songId: String) => {
    const { stationId } = this.props;

    this.songServices.upVote(stationId, songId).subscribe(
      response => {},
      err => {
        this.setState({ votingError: err });
      },
    );
  };

  public downVote = (songId: String) => {
    const { stationId } = this.props;

    this.songServices.downVote(stationId, songId).subscribe(
      response => {},
      err => {
        this.setState({ votingError: err });
      },
    );
  };

  public addFavouriteSong = () => {
    alert('Add favourite clicked!');
    // TODO: Implemented addFavouriteSong function
  };

  public addSong(song: any) {
    this.setState(prevState => {
      return {
        playlist: [song, ...prevState.playlist],
      };
    });
  }

  public isFavorited(playlistItem: Song, favoriteList: IFavouriteItem[]) {
    return favoriteList.some(item => item.songId === playlistItem.id);
  }

  public render() {
    const nowPlaying = true;
    if (!nowPlaying) {
      return (
        <Card className="play-list">
          <CardBody className="play-list-none">
            <i className="fa fa-warning" />
            <h3>
              There is no song in the playlist.<br />Please add new song.
            </h3>
          </CardBody>
        </Card>
      );
    }

    return (
      <div className="playlist">
        <FlipMoveList className="flip-move-playlist">
          {this.props.playlist.map((song, index) => {
            return (
              <PlaylistItem
                key={song.id || index}
                {...song}
                upVote={(songId: String) => this.upVote(songId)}
                downVote={(songId: String) => this.downVote(songId)}
                votingError={this.state.votingError}
                isFavorite={this.isFavorited(song, this.props.favoriteList)}
              />
            );
          })}
        </FlipMoveList>
      </div>
    );
  }
}
