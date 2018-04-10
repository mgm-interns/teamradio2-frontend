import { StationPlayer } from 'Components/StationPlayer';
import { IApplicationState } from 'Configuration/Redux';
import { Dispatch } from 'Configuration/Redux';
import { Song } from 'Models/Song';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { shiftSong } from '../../Redux';
import './NowPlaying.scss';

interface IStateProps {
  song?: Song;
}

interface IDispatchProps {
  shiftSong?: () => void;
}

interface IOwnProps {
  muted: boolean;
}

type IProps = IStateProps & IDispatchProps & IOwnProps;

interface IState {
  refPlayer: any;
  seekTime: number;
  receivedAt: number;
}

export class NowPlayingComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      refPlayer: null,
      seekTime: null,
      receivedAt: new Date().getTime(),
    };
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { song } = nextProps;
    if (song !== undefined) {
      setTimeout(() => {
        this.props.shiftSong();
      }, song.duration * 1000);
    }
  }

  public render() {
    const { muted, song } = this.props;
    const url = song ? song.url : null;

    return (
      <StationPlayer url={url} playing={true} showProgressbar muted={muted} />
    );
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  song: state.playlist.nowPlaying,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  shiftSong: () => dispatch(shiftSong()),
});

export const NowPlaying = connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NowPlayingComponent);
