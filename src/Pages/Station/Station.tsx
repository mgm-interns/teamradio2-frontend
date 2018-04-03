import * as classNames from 'classnames';
import { AddSong, StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Station.scss';

import { NowPlaying, PlaylistTabs, StationHeader } from 'Modules/Station';

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
      <Container>
        <Row>
          <Col xs={12}>
            <StationBrowser/>
          </Col>
          <Col xs={12} lg={8}>
            <StationHeader
              muted={muted}
              isPassive={isPassive}
              onVolumeClick={this.onVolumeClick}
              onLightClick={this.onLightClick}
            />
            <NowPlaying muted={muted} />
          </Col>
          <Col xs={12} lg={4}>
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
      </Container>
    );
  }
}
