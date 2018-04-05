import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Progress } from 'reactstrap';

import './StationPlayer.scss';

const ACCEPTABLE_DELAY = 1;

interface IProps {
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

interface IState {
  played: number;
  buffer: number;
  seekTime: number;
  receivedAt: number;
  isPaused: boolean;
}

interface ISeekTimeProps {
  seekTime: number;
  receivedAt: number;
}

export class StationPlayer extends Component<IProps, IState> {
  private playerRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      played: 0,
      buffer: 0,
      seekTime: props.seekTime,
      receivedAt: props.receivedAt,
      isPaused: false,
    };
  }

  public ref = (input: any) => {
    this.playerRef = input;
  };

  public render() {
    const { url, playing, showProgressbar, muted }: IProps = this.props;
    console.log(url);
    return [
      <ReactPlayer
        key={1}
        url={url}
        ref={this.ref}
        controls={false}
        playing={playing}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ pointerEvents: 'none' }}
        volume={1}
        muted={muted}
        width="100%"
        height="80vh"
      />,
      showProgressbar &&
        url && <Progress key={2} className="progress" animated value={10.2} />,
    ];
  }

  public seekToTime({ seekTime, receivedAt }: ISeekTimeProps) {
    // console.log(StationPlayer._getExactlySeektime({seekTime, receivedAt}));
    // this.playerRef.seekTo(StationPlayer._getExactlySeektime({seekTime, receivedAt}));
  }

  public static _getExactlySeektime({ seekTime, receivedAt }: ISeekTimeProps) {
    // const currentTime: number = new Date().getTime();
    // const delayedTime: number = (currentTime - receivedAt) / 1000;
    // return Math.abs(seekTime + delayedTime);
  }

  public _onStartPlayer() {
    // this.seekToTime(this.state);
  }

  public _onProgressPlayer({ played, loaded, playedSeconds }: any) {
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

  public _onPausePlayer() {
    // this.setState({
    //   isPaused: true,
    // });
  }

  public _onPlayPlayer() {
    // if (this.state.isPaused) {
    //   this.setState({
    //     isPaused: false,
    //   });
    //   const exactlyTime = StationPlayer._getExactlySeektime(this.state);
    //   this.playerRef.seekTo(exactlyTime);
    // }
  }
}
