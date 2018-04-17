import * as React from 'react';
import { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import { Progress } from 'reactstrap';
import './StationPlayer.scss';

interface IProps {
  url: string;
  playing: boolean;
  showProgressbar: boolean;
  progress?: number;
  muted: boolean;
  playerRef?: (node: ReactPlayer) => void;
  onProgress?: (playerState: IReactPlayerPropsOnProgressState) => void;
  onStart?: () => void;
}

interface IState {
  played: number;
  loaded: number;
}

export interface IReactPlayerPropsOnProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export class StationPlayer extends Component<IProps, IState> {
  private playerRef: ReactPlayer;

  constructor(props: IProps) {
    super(props);

    this.state = {
      played: this.props.progress || 0,
      loaded: 0,
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { progress: oldProgress } = this.props;
    const { progress: nextProgress } = nextProps;
    if (oldProgress !== nextProgress) {
      this.setState({
        played: nextProgress,
      });
    }
  }

  public render() {
    const { url, playing, showProgressbar, muted } = this.props;
    const { played, loaded } = this.state;

    return (
      <Fragment>
        <div className="player">
          <ReactPlayer
            url={url}
            ref={this.ref}
            controls={false}
            playing={playing}
            onProgress={this.onProgress}
            onStart={this.onStart}
            youtubeConfig={{ playerVars: { disablekb: 1 } }}
            style={{ pointerEvents: 'none' }}
            volume={1}
            muted={muted}
            width="100%"
            height="100%"
          />
        </div>
        {showProgressbar &&
          url && (
            <Progress multi className="progress">
              <Progress
                bar
                className="progress-bar"
                animated
                value={this.parseProgressValue(played)}
              />
              <Progress
                bar
                className="progress-buffer"
                animated
                value={this.parseProgressValue(loaded - played)}
              />
            </Progress>
          )}
      </Fragment>
    );
  }

  private parseProgressValue = (value: number) => {
    if (value) {
      return value * 100;
    }
    return 0;
  };

  private ref = (input: ReactPlayer) => {
    this.playerRef = input;

    const { playerRef } = this.props;
    if (playerRef) {
      playerRef(this.playerRef);
    }
  };

  private onProgress = (playerState: IReactPlayerPropsOnProgressState) => {
    this.setState({
      loaded: playerState.loaded,
    });

    if (this.props.onProgress) {
      this.props.onProgress(playerState);
    }
  };

  private onStart = () => {
    if (this.props.onStart) {
      this.props.onStart();
    }
  };
}
