import { Component } from 'react';
import * as React from 'react';
import { StationPlayer } from '../../../../Components/StationPlayer';
import './NowPlaying.scss';

interface IProps {
  muted: boolean;
}

interface IState {
  refPlayer: any;
  seekTime: number;
  receivedAt: number;
}

export class NowPlaying extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      refPlayer: null,
      seekTime: null,
      receivedAt: new Date().getTime(),
    };
  }

  public render() {
    const url = 'https://www.youtube.com/watch?v=cmSbXsFE3l8';
    const { muted }: IProps = this.props;

    return (
      <StationPlayer url={url} playing={true} showProgressbar muted={muted} />
    );
  }
}
