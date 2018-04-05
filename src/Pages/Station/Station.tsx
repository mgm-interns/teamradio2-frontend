import * as classNames from 'classnames';
import { AddSong, StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Col, Row } from 'reactstrap';
import './Station.scss';

import {
  ConfigurationButton,
  NowPlaying,
  PlaylistTabs,
  StationSharing,
  StationHeader,
} from 'Modules/Station';

const buttonActions = {
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
};

interface IProps {} // tslint:disable-line

interface IState {
  muted: boolean;
  isPassive: boolean;
}

export class Station extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
    };
  }

  public onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  public onLightClick = () => {
    this.setState({
      isPassive: !this.state.isPassive,
    });
  };

  public render() {
    const { muted, isPassive } = this.state;

    return (
      <Row className="m-0 station-container">
        <Col xs={12} className="station-browser-container">
          <StationBrowser />
        </Col>
        <Col xs={12} lg={8} className="mt-3 pr-lg-0 player-container">
          <StationHeader
            muted={muted}
            isPassive={isPassive}
            onVolumeClick={this.onVolumeClick}
            onLightClick={this.onLightClick}
          />
          <NowPlaying muted={muted} />
        </Col>
        <Col xs={12} lg={4} className="mt-3">
          <div className="playlist-tabs-container">
            <PlaylistTabs />
          </div>
        </Col>
        <Col xs={12}>
          <div className="add-song-container">
            <h1>Add Song</h1>
            <AddSong />
          </div>
        </Col>
      </Row>
    );
  }
}
