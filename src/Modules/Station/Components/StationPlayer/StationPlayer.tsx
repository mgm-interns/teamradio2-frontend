import { Component } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player'
import './StationPlayer.scss';


export class StationPlayer extends Component {

  constructor(props: any, context: any) {
    super(props, context);

    this._onStartPlayer = this._onStartPlayer.bind(this);
    this._onPausePlayer = this._onPausePlayer.bind(this);
    this._onPlayPlayer = this._onPlayPlayer.bind(this);
    this._onProgressPlayer = this._onProgressPlayer.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    //  TODO: Force update seektime when component receive new props
  }

  // TODO: Prevent calling render when isPaused changed
  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //
  // }

  render() {
    const url = 'https://www.youtube.com/watch?v=ImPM5IDIYPs';
    const playing = true;
    return (
      <ReactPlayer url={url}
                   controls={false}
                   playing={playing}
                   onStart={this._onStartPlayer}
                   onPlay={this._onPlayPlayer}
                   onPause={this._onPausePlayer}
                   onProgress={this._onProgressPlayer}
                   {...othersProps}
      />
    );
  }


  _onStartPlayer() {

  }

  _onProgressPlayer() {

  }

  _onPausePlayer() {

  }

  _onPlayPlayer() {

  }

  //  TODO: seekToTime func
  //  TODO: _getExactlySeektime func
}