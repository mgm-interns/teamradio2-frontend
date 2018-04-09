import { StationPlayer } from 'Components/StationPlayer';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { shiftSong } from '../../Redux';
import './NowPlaying.scss';

interface IProps {
  muted: boolean;
  song?: any;
  shiftSong?: () => void;
}

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

  public async componentWillReceiveProps(nextProps: any) {
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

const mapStateToProps = (state: any) => ({
  song: state.playlist.data[0],
});

interface IDispatchFromProps {
  shiftSong: () => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  shiftSong: () => dispatch(shiftSong()),
});

export const NowPlaying = connect<any, IDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(NowPlayingComponent);
