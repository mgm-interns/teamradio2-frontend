import { Component } from 'react';
import * as React from 'react';
import './NowPlaying.scss';
import { StationPlayer } from '../../../../Components/StationPlayer';

interface Props {
  // nowPlaying: object;
  // autoPlay: boolean;
  muted: boolean;
  // skip: object;
}

interface State {
  // refPlayer: any;
  // seekTime: number;
  // receivedAt: number;
  // showProgressbar: boolean;
}

export class NowPlaying extends Component<Props, State> {
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
    const url = 'https://www.youtube.com/watch?v=cmSbXsFE3l8';
    const { muted }: Props = this.props;

    return (
      <StationPlayer url={url} playing={true} showProgressbar muted={muted} />
    );
  }

  renderSkipNotification() {}
}
