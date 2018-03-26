import * as React from 'react';
import { Component } from 'react';
import FlipMoveList from 'react-flip-move';
import { Card, CardBody } from 'reactstrap';
import './Playlist.scss';
import { Item } from "./Item";

export class Playlist extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const nowPlaying = false;
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
          <FlipMoveList>
            <Item key={1}/>
          </FlipMoveList>
        </Card>
      )
    }

  }

}
