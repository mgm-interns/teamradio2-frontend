import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistProps {
  playlist: any[];
}

export class Playlist extends Component<IPlaylistProps, IPlaylistProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      playlist: props.playlist,
    };

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.addFavouriteSong = this.addFavouriteSong.bind(this);
  }

  public upVote() {
    alert('Up vote clicked!');
    // TODO: Implemented upVote function
  }

  public downVote() {
    alert('Down vote clicked!');
    // TODO: Implemented downVote function
  }

  public addFavouriteSong() {
    alert('Add favourite clicked!');
    // TODO: Implemented addFavouriteSong function
  }

  public addSong(song: any) {
    this.setState(prevState => {
      return {
        playlist: [song, ...prevState.playlist],
      };
    });
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
      <Card className="play-list">
        <FlipMoveList
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}>
          {this.props.playlist.map((song, index) => (
            <PlaylistItem
              key={song.song_id || index}
              {...song}
              upVote={() => this.upVote()}
              downVote={() => this.downVote()}
            />
          ))}
        </FlipMoveList>
      </Card>
    );
  }
}
