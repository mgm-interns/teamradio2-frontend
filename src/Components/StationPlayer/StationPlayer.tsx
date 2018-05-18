import * as React from 'react';
import { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import { Progress } from 'reactstrap';
import './StationPlayer.scss';

const SKIP_SONG_TIME = 5000;
const COUNT_DOWN_TIME = 1000;

interface IProps {
  url: string;
  playing: boolean;
  showProgressbar: boolean;
  progress?: number;
  playerVolume: boolean;
  playerRef?: (node: ReactPlayer) => void;
  onProgress?: (playerState: IReactPlayerPropsOnProgressState) => void;
  onStart?: () => void;
  onEnded?: () => void;
  message?: string;
  thumbnail?: string;
  skipped?: boolean;
}

interface IState {
  played: number;
  loaded: number;
  isCountingDown: boolean;
}

export interface IReactPlayerPropsOnProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export class StationPlayer extends Component<IProps, IState> {
  private playerRef: ReactPlayer;
  private countDownElement: HTMLElement;

  constructor(props: IProps) {
    super(props);
    this.state = {
      played: this.props.progress || 0,
      loaded: 0,
      isCountingDown: false,
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.needToUpdateProgress(nextProps)) {
      this.setState({
        played: nextProps.progress,
      });
    }
  }

  public componentDidUpdate() {
    const { skipped } = this.props;
    const { isCountingDown } = this.state;
    if (skipped && !isCountingDown) {
      this.skipSongCountDown();
    }
  }

  public renderPlayerEmpty() {
    return (
      <div className="player player-none">
        <div>
          <i className="fa fa-music" />
          <h5>There is no playing song.</h5>
        </div>
      </div>
    );
  }

  public renderSkipSongCountDown() {
    const { thumbnail } = this.props;
    return (
      <Fragment>
        <div className="player">
          <div
            className="skip-song-container"
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}>
            <div className="skip-song-cover" />
            <div className="skip-song-message-container">
              <i className="fa fa-thumbs-down" />
              <div className="skip-song-message">
                <p>Our listeners don't like this song</p>
                <p>
                  It will be skipped in{' '}
                  <span
                    ref={ref => {
                      this.countDownElement = ref;
                    }}>
                    5
                  </span>...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  public renderPlayer() {
    const { url, playing, showProgressbar, playerVolume, message } = this.props;
    const { played, loaded } = this.state;
    return (
      <Fragment>
        <div className="player">
          {message && this._renderMessage(message)}
          <ReactPlayer
            url={url}
            ref={this.ref}
            controls={false}
            playing={playing}
            onProgress={this.onProgress}
            onStart={this.onStart}
            onEnded={this.onEnded}
            config={{
              youtube: {
                playerVars: { disablekb: 1 },
              },
            }}
            style={{ pointerEvents: 'none' }}
            volume={1}
            muted={!playerVolume}
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

  public render() {
    const { url, skipped } = this.props;
    if (!url) {
      return this.renderPlayerEmpty();
    }
    return (
      <Fragment>
        {skipped ? this.renderSkipSongCountDown() : this.renderPlayer()}
      </Fragment>
    );
  }

  private needToUpdateProgress(nextProps: IProps) {
    const { progress: oldProgress } = this.props;
    const { progress: nextProgress } = nextProps;
    return oldProgress !== nextProgress;
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

  private onEnded = () => {
    if (this.props.onEnded) {
      this.props.onEnded();
    }
  };

  private _renderMessage(message: string) {
    if (!message.trim()) {
      return null;
    }
    return (
      <p className="player-message">
        <span className="content">{message}</span>
      </p>
    );
  }

  private skipSongCountDown() {
    this.setState({ isCountingDown: true });
    let skipSongTime = SKIP_SONG_TIME;
    const countDownInterval = setInterval(() => {
      if (this.countDownElement && skipSongTime > 0) {
        this.countDownElement.innerText = (
          (skipSongTime -= COUNT_DOWN_TIME) / COUNT_DOWN_TIME
        ).toString();
      } else {
        clearInterval(countDownInterval);
        this.setState({ isCountingDown: false });
      }
    }, COUNT_DOWN_TIME);
  }
}
