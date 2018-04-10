import { StationPlayer } from 'Components/StationPlayer';
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

export class NowPlayingComponent extends Component<IProps, IState> {
  private playerRef: ReactPlayer;

  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  public componentDidMount() {
    const { nowPlaying } = this.props;
    if (nowPlaying) {
      // Null checker
      this.seekTime(nowPlaying);
    }
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { nowPlaying: oldNowPlaying } = this.props;
    const { nowPlaying: nextNowPlaying } = nextProps;
    if (
      JSON.stringify(oldNowPlaying) !== JSON.stringify(nextNowPlaying) &&
      nextNowPlaying // Null checker
    ) {
      this.seekTime(nextNowPlaying);
    }
  }

  public seekTime = (nowPlaying: NowPlayingSong): void => {
    const duration = convertToEpochTimeInSeconds(nowPlaying.duration);
    const startingTime = nowPlaying.startingTime;
    const now = convertToEpochTimeInSeconds(Date.now().valueOf());

    const playedTime = now - startingTime;
    const playedTimeInFraction = playedTime / duration;

    this.setState(
      {
        progress: playedTimeInFraction,
      },
      // Must call seekTo after updating state due to render process
      () => {
        this.playerRef.seekTo(playedTime);
      },
    );
  };

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
      />
    );
  }

  private bindPlayerRef = (ref: ReactPlayer) => {
    this.playerRef = ref;
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

export const NowPlaying = connect<IStateProps, {}, IOwnProps>(
  mapStateToProps,
  undefined,
)(NowPlayingComponent);
