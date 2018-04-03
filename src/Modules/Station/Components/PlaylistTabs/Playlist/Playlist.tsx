import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

export class Playlist extends Component<any, any> {
  constructor(props: any) {
    super(props);

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
    const song1 = {
      song_id: '12',
      title: 'ABC Song',
      isPlaying: true,
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg',
      creator: {
        name: 'Thuy Tien',
        username: 'ThuyTien',
        avatar_url:
          'https://lh5.googleusercontent.com/-wEPw9I56XVk/AAAAAAAAAAI/AAAAAAAAFFo/DLzRP_EyOxk/s96-c/photo.jpg',
      },
      duration: '20:06',
      willBeSkipped: false,
      message: 'Hello',
      upVotes: 4,
      downVotes: 3,
    };
    const song2 = {
      song_id: '15',
      title: 'Perfect- Ed Sheeran',
      isPlaying: false,
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg',
      creator: {
        name: 'Thuy Tien',
        username: 'ThuyTien',
        avatar_url:
          'https://res.cloudinary.com/cocacode2/image/upload/v1517992692/hhunvpjq7ogvoehk7flk.png',
      },
      duration: '20:06',
      willBeSkipped: true,
      message: 'Iloveyou',
      upVotes: 2,
      downVotes: 1,
    };

    const playlist = [song1, song2];

    return (
      <Card className="play-list">
        <FlipMoveList
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}>
          {playlist.map((song, index) => (
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
