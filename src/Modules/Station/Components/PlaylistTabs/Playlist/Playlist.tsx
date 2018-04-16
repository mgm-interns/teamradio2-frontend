import { element } from 'prop-types';
import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import { Song } from '../../../../../Models/Song';
import { UserServices } from '../../../../../Services/Http/UserServices';
import { FavouriteItem, IFavouriteItem } from '../Favourite/FavouriteItem';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistProps {
  playlist: any[];
}

interface IFavoriteListProps {
  favoriteList: IFavouriteItem[];
}

type Iprops = IPlaylistProps & IFavoriteListProps;

export class Playlist extends Component<Iprops, IPlaylistProps> {
  private userServices: UserServices;
  constructor(props: any) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      playlist: props.playlist,
    };

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.addFavouriteSong = this.addFavouriteSong.bind(this);
  }

  public upVote = () => {
    alert('Up vote clicked!');
    // TODO: Implemented upVote function
  };

  public downVote = () => {
    alert('Down vote clicked!');
    // TODO: Implemented downVote function
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
                upVote={() => this.upVote()}
                downVote={() => this.downVote()}
                isFavorite={this.isFavorited(song, this.props.favoriteList)}
              />
            );
          })}
        </FlipMoveList>
      </div>
    );
  }
}
