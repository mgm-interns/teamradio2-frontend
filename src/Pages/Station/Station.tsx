import * as React from 'react';
import { Component } from 'react';
import './Station.scss';

import { NowPlaying } from '../../Modules/Station/Components/NowPlaying';

export class Station extends Component {
  render() {
    const muted = false;
    const playlist_length = 3;

    return (
      <div className="container">
        <div className="row u-margin-top-medium">
          <div className="col-8 ">
            <h1>Handmade Radio</h1>
            <NowPlaying />
          </div>
          <div className="col-4">
            <span>this is playlist</span>
          </div>
        </div>
      </div>
    );
  }
}
