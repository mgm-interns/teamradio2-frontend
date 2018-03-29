import * as React from 'react';
import { Component } from 'react';
import { Progress } from 'reactstrap';
import ReactPlayer from 'react-player';

import './StationPlayer.scss';

const ACCEPTABLE_DELAY = 1;

interface Props {
  url: string;
  playing: boolean;
  seekTime?: number;
  receivedAt?: number;
  width?: string;
  height?: string;
  showProgressbar: boolean;
  muted: boolean;
  ref?: object;
}

interface State {
  played: number;
  buffer: number;
  seekTime: number;
  receivedAt: number;
  isPaused: boolean;
}

interface SeekTimeProps {
  seekTime: number;
  receivedAt: number;
}

export class StationPlayer extends Component<Props, State> {
  private playerRef: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      played: 0,
      buffer: 0,
      seekTime: props.seekTime,
      receivedAt: props.receivedAt,
      isPaused: false,
    };

    this._onStartPlayer = this._onStartPlayer.bind(this);
    this._onPausePlayer = this._onPausePlayer.bind(this);
    this._onPlayPlayer = this._onPlayPlayer.bind(this);
    this._onProgressPlayer = this._onProgressPlayer.bind(this);
  }

  ref = (input: any) => {
    this.playerRef = input;
  };

  render() {
    const { url, playing, showProgressbar, muted }: Props = this.props;
    return [
      <ReactPlayer
        key={1}
        url={url}
        ref={this.ref}
        controls={false}
        playing={playing}
        onStart={this._onStartPlayer}
        onPlay={this._onPlayPlayer}
        onPause={this._onPausePlayer}
        onProgress={this._onProgressPlayer}
        style={{ pointerEvents: 'none' }}
        muted={muted}
        width="100%"
        height="60vh"
      />,
      showProgressbar && (
        <Progress
          key={2}
          className="progress"
          animated
          color="info"
          value={10.2}
        />
      ),
    ];
  }

  seekToTime({ seekTime, receivedAt }: SeekTimeProps) {
    // console.log(StationPlayer._getExactlySeektime({seekTime, receivedAt}));
    // this.playerRef.seekTo(StationPlayer._getExactlySeektime({seekTime, receivedAt}));
  }

  static _getExactlySeektime({ seekTime, receivedAt }: SeekTimeProps) {
    // const currentTime: number = new Date().getTime();
    // const delayedTime: number = (currentTime - receivedAt) / 1000;
    // return Math.abs(seekTime + delayedTime);
  }

  _onStartPlayer() {
    // this.seekToTime(this.state);
  }

  _onProgressPlayer({ played, loaded, playedSeconds }: any) {
    // this.setState({
    //   played: played * 100,
    //   buffer: loaded * 100,
    // });
    // const exactlyTime = StationPlayer._getExactlySeektime(this.state);
    // const differentTime = Math.abs(exactlyTime - playedSeconds);
    // if (differentTime > ACCEPTABLE_DELAY) {
    //   this.playerRef.seekTo(exactlyTime);
    // }
  }

  _onPausePlayer() {
    // this.setState({
    //   isPaused: true,
    // });
  }

  _onPlayPlayer() {
    // if (this.state.isPaused) {
    //   this.setState({
    //     isPaused: false,
    //   });
    //   const exactlyTime = StationPlayer._getExactlySeektime(this.state);
    //   this.playerRef.seekTo(exactlyTime);
    // }
  }
}
