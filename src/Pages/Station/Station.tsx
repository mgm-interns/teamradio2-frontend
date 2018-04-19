import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { NowPlayingSong, Station as StationModel } from 'Models';
import {
  AddSong,
  NowPlaying,
  PlaylistTabs,
  StationBrowser,
  StationHeader,
} from 'Modules/Station';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Modal, ModalBody, Row } from 'reactstrap';
import { compose } from 'redux';
import './Station.scss';

interface IStateProps {
  nowPlaying: NowPlayingSong;
}

interface IOwnProps {}

type IProps = IOwnProps & IStateProps;

interface IState {
  muted: boolean;
  isPassive: boolean;
  station: StationModel;
}

class StationComponent extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      muted: false,
      isPassive: false,
      station: null,
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (!nextProps.nowPlaying) {
      this.setState({ isPassive: false });
    }
  }

  public onVolumeClick = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };

  public onLightClick = () => {
    this.setState(
      {
        isPassive: !this.state.isPassive,
      },
      () => {
        if (this.state.isPassive) {
          document
            .getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow-y: hidden');
        } else {
          document.getElementsByTagName('body')[0].removeAttribute('style');
        }
      },
    );
  };

  public _renderPlayer = () => {
    const { muted, isPassive } = this.state;
    const stationId = this.parseStationId();

    return (
      <Fragment>
        <StationHeader
          muted={muted}
          isPassive={isPassive}
          onVolumeClick={this.onVolumeClick}
          onLightClick={this.onLightClick}
          stationId={stationId}
        />
        <NowPlaying muted={muted} />
      </Fragment>
    );
  };

  public render() {
    const { isPassive } = this.state;
    const stationId = this.parseStationId();

    return [
      isPassive && (
        <div className="passive-container" key={0}>
          <img src="/img/logo.png" alt="radio-logo" />
        </div>
      ),
      <Row className="m-0 station-container" key={1}>
        <Col xs={12} className="station-browser-container">
          <StationBrowser />
        </Col>
        <Col className="p-0 m-auto extra-large-container">
          <Row className="m-0">
            <Col
              xs={12}
              xl={8}
              className={classNames('mt-3', 'pr-xl-0', 'player-container', {
                'passive-mode': isPassive,
              })}>
              {this._renderPlayer()}
            </Col>
            <Col xs={12} xl={4} className="mt-3">
              <div className="playlist-tabs-container">
                <PlaylistTabs stationId={stationId} />
              </div>
            </Col>
            <Col xs={12}>
              <div className="add-song-container">
                <h1>Add Song</h1>
                <AddSong stationId={stationId} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>,
    ];
  }

  private parseStationId() {
    const { match } = this.props;

    return match.params.stationId;
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

export const Station = compose(
  connect<IStateProps, {}, IOwnProps>(mapStateToProps, undefined),
  withRouter,
)(StationComponent);
