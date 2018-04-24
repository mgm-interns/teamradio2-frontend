import { BaseComponent } from 'BaseComponent';
import {
  IReactPlayerPropsOnProgressState,
  StationPlayer,
} from 'Components/StationPlayer';
import { IApplicationState } from 'Configuration/Redux';
import { convertToEpochTimeInSeconds, isMobileBrowser } from 'Helpers';
import { NowPlayingSong } from 'Models';
import * as React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import './NowPlaying.scss';

interface IPlayerProgress {
  playedTime: number;
  playedTimeInFraction: number;
}

interface IStateProps {
  nowPlaying: NowPlayingSong;
}

interface IOwnProps {
  muted: boolean;
}

type IProps = IStateProps & IOwnProps;

interface IState {
  progress: number;
}

interface IPlayedTime {
  playedTime: number;
  playedTimeInFraction: number;
}

const MAXIMUM_DELAY = 2; // seconds

export class NowPlayingComponent extends BaseComponent<IProps, IState> {
  private playerRef: ReactPlayer;

  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  public componentDidMount() {
    this.updateSeekTime(this.props.nowPlaying);
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    if (this.isNowPlayingChanged(nextProps)) {
      this.updateSeekTime(nextProps.nowPlaying);
    }
  }

  public render() {
    const { progress } = this.state;
    const { muted, nowPlaying } = this.props;
    const url = nowPlaying ? nowPlaying.url : null;

    if (isMobileBrowser()) {
      return null;
    }
    return (
      <StationPlayer
        url={url}
        playing={true}
        showProgressbar
        muted={muted}
        playerRef={this.bindPlayerRef}
        progress={progress}
        onProgress={this.onProgress}
        onStart={this.onStart}
        onEnded={this.onEnded}
      />
    );
  }

  private bindPlayerRef = (ref: ReactPlayer) => {
    this.playerRef = ref;
  };

  private onProgress = (playerState: IReactPlayerPropsOnProgressState) => {
    const { nowPlaying } = this.props;
    const {
      playedTime,
      playedTimeInFraction: serverPlayedTime,
    } = this.getPlayedTime(nowPlaying);
    const { played: playerPlayedTime } = playerState;

    if (
      this.needToSeekTimeOnPlayerProgress(serverPlayedTime, playerPlayedTime)
    ) {
      this.updateProgressAndSeekTime({
        playedTime,
        playedTimeInFraction: serverPlayedTime,
      });
    } else {
      this.updateProgress(serverPlayedTime);
    }
  };

  private onStart = () => {
    const { nowPlaying } = this.props;
    this.updateProgressAndSeekTime(this.getPlayedTime(nowPlaying));
  };

  private onEnded = () => {
    this.updateProgress(1);
  };

  private roundPlayerTime = (fractionTime: number) => {
    const { nowPlaying: { duration } } = this.props;
    return convertToEpochTimeInSeconds(Math.round(duration * fractionTime));
  };

  private updateSeekTime = (nowPlaying: NowPlayingSong): void => {
    if (!nowPlaying) {
      return;
    }
    this.updateProgressAndSeekTime(this.getPlayedTime(nowPlaying));
  };

  private updateProgressAndSeekTime = ({
    playedTime,
    playedTimeInFraction,
  }: IPlayerProgress) => {
    this.setState(
      {
        progress: playedTimeInFraction,
      },
      () => {
        if (this.playerRef) {
          this.playerRef.seekTo(playedTime);
        }
      },
    );
  };

  private updateProgress(progress: number) {
    this.setState({ progress });
  }

  private needToSeekTimeOnPlayerProgress(
    serverPlayedTime: number,
    playerPlayedTime: number,
  ): boolean {
    const roundedServerPlayedTime = this.roundPlayerTime(serverPlayedTime);
    const roundedPlayerPlayedTime = this.roundPlayerTime(playerPlayedTime);
    const deviation = roundedPlayerPlayedTime - roundedServerPlayedTime;
    return Math.abs(deviation) > MAXIMUM_DELAY;
  }

  private getPlayedTime = (nowPlaying: NowPlayingSong): IPlayedTime => {
    const duration = convertToEpochTimeInSeconds(nowPlaying.duration);
    const startingTime = nowPlaying.startingTime;
    const now = convertToEpochTimeInSeconds(Date.now().valueOf());

    const playedTime = now - startingTime;
    const playedTimeInFraction = playedTime / duration;
    return {
      playedTime,
      playedTimeInFraction,
    };
  };

  private isNowPlayingChanged(nextProps: IProps) {
    const { nowPlaying: oldNowPlaying } = this.props;
    const { nowPlaying: nextNowPlaying } = nextProps;
    return JSON.stringify(oldNowPlaying) !== JSON.stringify(nextNowPlaying);
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

export const NowPlaying = connect<IStateProps, {}, IOwnProps>(
  mapStateToProps,
  undefined,
)(NowPlayingComponent);
