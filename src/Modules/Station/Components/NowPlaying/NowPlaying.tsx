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
    this.seekTime(this.props.nowPlaying);
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    if (this.isNowPlayingChanged(nextProps)) {
      this.seekTime(nextProps.nowPlaying);
    }
  }

  public isNowPlayingChanged(nextProps: IProps) {
    const { nowPlaying: oldNowPlaying } = this.props;
    const { nowPlaying: nextNowPlaying } = nextProps;
    return JSON.stringify(oldNowPlaying) !== JSON.stringify(nextNowPlaying);
  }

  public seekTime = (nowPlaying: NowPlayingSong): void => {
    if (!nowPlaying) {
      return;
    }
    const duration = convertToEpochTimeInSeconds(nowPlaying.duration);
    const startingTime = nowPlaying.startingTime;
    const now = convertToEpochTimeInSeconds(Date.now().valueOf());

    const playedTime = now - startingTime;
    const playedTimeInFraction = playedTime / duration;

    this.setState(
      {
        progress: playedTimeInFraction,
      },
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

  private bindPlayerRef = (ref: ReactPlayer): ReactPlayer => {
    this.playerRef = ref;
    return ref;
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.station.nowPlaying,
});

export const NowPlaying = connect<IStateProps, {}, IOwnProps>(
  mapStateToProps,
  undefined,
)(NowPlayingComponent);
