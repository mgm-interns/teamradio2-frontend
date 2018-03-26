import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import './Playlist.scss';
import { ItemPlaylist } from "./ItemPlaylist";

export class Playlist extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const nowPlaying = true;
    if (!nowPlaying) {
      return (
        <Card className="play-list">
          <CardBody className="play-list-none">
            <i className="fa fa-warning"></i>
            <h3>There is no song in the playlist.<br/>Please add new song.</h3>
          </CardBody>
        </Card>
      )
    } else {
      return (
        <Card className="play-list">
          <FlipMoveList
            style={{
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            <ItemPlaylist isPlaying={true} isSkip={false} key={1}/>
            <ItemPlaylist isSkip={true} mess={`Iloveyou`} key={2}/>
          </FlipMoveList>
        </Card>
      )
    }

  }

}
