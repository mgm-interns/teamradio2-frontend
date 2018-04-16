import * as React from 'react';
import { Component } from 'react';
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
    const { played } = this.state;
    return [
      <div className="player" key={1}>
        <ReactPlayer
          url={url}
          ref={this.ref}
          controls={false}
          playing={playing}
          onProgress={this.onProgress}
          youtubeConfig={{ playerVars: { disablekb: 1 } }}
          style={{ pointerEvents: 'none' }}
          volume={1}
          muted={muted}
          width="100%"
          height="100%"
        />
      </div>,
      showProgressbar &&
        url && (
          <Progress
            key={2}
            className="progress"
            animated
            value={played * 100 || 0}
          />
        ),
    ];
  }

  private ref = (input: ReactPlayer) => {
    this.playerRef = input;

    const { playerRef } = this.props;
    if (playerRef) {
      playerRef(this.playerRef);
    }
  };

  private onProgress = (playerState: IReactPlayerPropsOnProgressState) => {
    const { played, loaded } = playerState;
    this.setState(
      {
        played,
        loaded,
      },
      () => {
        if (this.props.onProgress) {
          this.props.onProgress(playerState);
        }
      },
    );
  };
}
