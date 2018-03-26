import * as React from 'react';
import { Component } from 'react';
import './Station.scss';

import { NowPlaying } from '../../Modules/Station/Components/NowPlaying';

export class Station extends Component {
  render() {
    const muted = false;
    const playlist_length = 3;
    const isPassive = false;
    const isShare = false;

    return (
      <div className="container">
        <div className="row u-margin-top-medium">
          <div className="col-8 ">
            <div className="row nowplaying-header">
              <div className="">
                <h1>Station name</h1>
              </div>
              <div className="nowplaying-actions">
                <button type="button" className="btn">
                  {muted ? (
                    <i className="fa fa-volume-up" />
                  ) : (
                    <i className="fa fa-volume-off" />
                  )}
                </button>
                <button type="button" className="btn">
                  {isPassive ? undefined : <i className="fa fa-lightbulb-o" />}
                </button>
                <button type="button" className="btn">
                  {isShare ? undefined : <i className="fa fa-share-alt" />}
                </button>
              </div>
            </div>
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
