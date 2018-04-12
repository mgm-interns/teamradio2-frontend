import { Station as StationModel } from 'Models/Station';
import { AddSong, StationBrowser } from 'Modules/Station';
import { NowPlaying, PlaylistTabs, StationHeader } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Modal, ModalBody, Row } from 'reactstrap';
import { compose } from 'redux';
import { IApplicationState } from '../../Configuration/Redux';
import { NowPlayingSong } from '../../Models/Song';
import './Station.scss';

interface IStateProps {
  nowPlaying: NowPlayingSong;
}

interface IOwnProps {} // tslint:disable-line

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
          this._renderPassiveModal();
        }
      },
    );
  };

  public _renderPassiveModal = () => {
    const { muted, isPassive } = this.state;
    const stationId = this.parseStationId();

    return (
      <Modal
        isOpen={isPassive}
        toggle={this.onLightClick}
        modalClassName="passive-modal"
        backdrop="static" // disable click event on backdrop
        className="d-flex mt-0 mb-0 align-items-center" // add classNames for modal-dialog
      >
        <ModalBody>
          <StationHeader
            muted={muted}
            isPassive={isPassive}
            onVolumeClick={this.onVolumeClick}
            onLightClick={this.onLightClick}
            stationId={stationId}
          />
          <NowPlaying muted={muted} />
        </ModalBody>
      </Modal>
    );
  };

  public _renderPlayer = () => {
    const { muted, isPassive } = this.state;
    const stationId = this.parseStationId();

    return (
      <div>
        <StationHeader
          muted={muted}
          isPassive={isPassive}
          onVolumeClick={this.onVolumeClick}
          onLightClick={this.onLightClick}
          stationId={stationId}
        />
        <NowPlaying muted={muted} />
      </div>
    );
  };

  public render() {
    const { isPassive } = this.state;
    const stationId = this.parseStationId();

    return (
      <Row className="m-0 station-container">
        <Col xs={12} className="station-browser-container">
          <StationBrowser />
        </Col>
        <Col className="p-0 m-auto extra-large-container">
          <Row className="m-0">
            <Col xs={12} xl={8} className="mt-3 pr-xl-0 player-container">
              {!isPassive ? this._renderPlayer() : this._renderPassiveModal()}
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
            {/*<Col xs={12} >*/}
            {/*<div className="chat-box-container">*/}
            {/*<h1>Chat Box</h1>*/}
            {/*<ChatBox />*/}
            {/*</div>*/}
            {/*</Col>*/}
          </Row>
        </Col>
      </Row>
    );
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
