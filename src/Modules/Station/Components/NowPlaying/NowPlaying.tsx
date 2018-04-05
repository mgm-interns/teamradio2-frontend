import { Component } from 'react';
import * as React from 'react';
import './NowPlaying.scss';
import { StationPlayer } from '../../../../Components/StationPlayer';
import { connect } from 'react-redux';

interface Props {
  // nowPlaying: object;
  // autoPlay: boolean;
  muted: boolean;
  // skip: object;
  song?: any;
}

interface State {
  // refPlayer: any;
  // seekTime: number;
  // receivedAt: number;
  // showProgressbar: boolean;
}

export class NowPlayingComponent extends Component<Props, State> {
  private playerRef: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      // refPlayer: null,
      // seekTime: null,
      // receivedAt: new Date().getTime(),
    };

    this.renderSkipNotification = this.renderSkipNotification.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
  }

  static calculateSeekTime(start: any) {
    // return parseInt(start, 10) / 1000;
  }

  setStateAsync(state: any) {}

  async componentWillReceiveProps(nextProps: any) {}

  render() {
    const { muted, song } = this.props;
    const url = song ? song.url : null;

    return (
      <StationPlayer url={url} playing={true} showProgressbar muted={muted} />
    );
  }

  renderSkipNotification() {}
}

const mapStateToProps = (state: any) => ({
  song: state.playlist.data[0],
});

export const NowPlaying = connect(mapStateToProps, null)(NowPlayingComponent);
