import {
  IReactPlayerPropsOnProgressState,
  StationPlayer,
} from 'Components/StationPlayer';
import { IApplicationState } from 'Configuration/Redux';
import { convertToEpochTimeInSeconds } from 'Helpers/DateTimeHelper';
import { NowPlayingSong } from 'Models/Song';
import { Component } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import './NowPlaying.scss';

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

const MAXIMUM_DELAY = 2; // seconds

export class NowPlayingComponent extends Component<IProps, IState> {
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

    return (
      <StationPlayer
        url={url}
        playing={true}
        showProgressbar
        muted={muted}
        playerRef={this.bindPlayerRef}
        progress={progress}
        onProgress={this.onProgress}
      />
    );
  }

  /**
   * Bind React player to component
   */
  private bindPlayerRef = (ref: ReactPlayer): ReactPlayer => {
    this.playerRef = ref;
    return ref;
  };

  /**
   * Handle the delay between client and server
   * Call every time React player triggers onProgress
   */
  private onProgress = (playerState: IReactPlayerPropsOnProgressState) => {
    const { nowPlaying } = this.props;
    const { playedTimeInFraction: serverPlayedTime } = this.parsePlayedTime(
      nowPlaying,
    );
    const { played: playerPlayedTime } = playerState;

    const roundedServerPlayedTime = this.roundPlayerTime(serverPlayedTime);
    const roundedPlayerPlayedTime = this.roundPlayerTime(playerPlayedTime);

    const deviation = roundedPlayerPlayedTime - roundedServerPlayedTime;

    if (Math.abs(deviation) > MAXIMUM_DELAY) {
      this.playerRef.seekTo(serverPlayedTime);
    }
  };

  /**
   * Round playing time from fraction value to second value
   */
  private roundPlayerTime = (fractionTime: number) => {
    const {
      nowPlaying: { duration },
    } = this.props;
    // Round the time to 2 decimals
    return convertToEpochTimeInSeconds(Math.round(duration * fractionTime));
  };

  /**
   * Update React Player progress bar
   * or re-track player based on NowPlaying
   */
  private updateSeekTime = (nowPlaying: NowPlayingSong): void => {
    if (!nowPlaying) {
      return;
    }
    const { playedTime, playedTimeInFraction } = this.parsePlayedTime(
      nowPlaying,
    );

    this.setState(
      {
        progress: playedTimeInFraction,
      },
      () => {
        this.playerRef.seekTo(playedTime);
      },
    );
  };

  /**
   * Parse playedTime into fraction or second value
   */
  private parsePlayedTime = (nowPlaying: NowPlayingSong) => {
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

  /**
   * Check if Now Playing has changed or not
   */
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
