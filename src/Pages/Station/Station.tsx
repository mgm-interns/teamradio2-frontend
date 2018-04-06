import { Station as StationModel } from 'Models/Station';
import { AddSong, StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './Station.scss';

import {
  NowPlaying,
  PlaylistTabs,
  StationHeader,
} from 'Modules/Station';
import { StationServices } from 'Services/Http';
import { StationPlaylistSSE } from 'Services/SSE';
import './Station.scss';

interface IProps {} // tslint:disable-line

interface IState {
  muted: boolean;
  isPassive: boolean;
  station: StationModel;
}

export class Station extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  private stationPlaylistSSEService: StationPlaylistSSE;
  private stationServices: StationServices;

  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
      station: null,
    };

    this.stationServices = new StationServices();
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

  public componentDidMount() {
    const stationId = this.parseStationId();

    this.stationServices.getStationById(stationId).subscribe(
      station => {
        this.setState({ station });
      },
      err => {
        // If station not found, redirect user to home page
        this.props.history.replace('/');
      },
    );

    // Start SSE service
    this.stationPlaylistSSEService = new StationPlaylistSSE(stationId);
    this.stationPlaylistSSEService.start();
  }

  public componentWillUnmount() {
    this.stationPlaylistSSEService.close();
  }

  public render() {
    const { muted, isPassive, station } = this.state;

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
            stationName={station && station.name}
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

  private parseStationId() {
    const { history: { location: { pathname } } } = this.props;

    const PATHNAME_REGEX = /(station\/)(.{0,})/;

    // Default station id if there is no station
    let stationId = '';

    const regexResult = PATHNAME_REGEX.exec(pathname);

    if (regexResult && regexResult[2]) {
      stationId = regexResult[2];
    }

    return stationId;
  }
}
