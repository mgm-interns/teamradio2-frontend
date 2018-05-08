import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { NowPlayingSong, Station as StationModel } from 'Models';
import {
  AddSong,
  ChatBox,
  NowPlaying,
  PlaylistTabs,
  StationBrowser,
  StationHeader,
} from 'Modules/Station';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
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
  isEnableVideo: boolean;
  station: StationModel;
  toggleChatPopup: boolean;
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
      isEnableVideo: true,
      station: null,
      toggleChatPopup: false,
    };
  }

  public componentDidMount() {
    // Automatically scroll to top when user open station page
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
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

  public enablePlayer = () => {
    this.setState({ isEnableVideo: !this.state.isEnableVideo });
  };

  public toggleChatPopup = () => {
    this.setState({ toggleChatPopup: !this.state.toggleChatPopup });
  };

  public _renderPlayer = () => {
    const { muted, isPassive, isEnableVideo } = this.state;
    const stationId = this.parseStationId();
    return (
      <Fragment>
        <StationHeader
          muted={muted}
          isPassive={isPassive}
          isEnableVideo={isEnableVideo}
          onVolumeClick={this.onVolumeClick}
          onLightClick={this.onLightClick}
          enablePlayer={this.enablePlayer}
          stationId={stationId}
        />
        {isEnableVideo && <NowPlaying muted={muted} />}
      </Fragment>
    );
  };

  public render() {
    const { isPassive, toggleChatPopup } = this.state;
    const stationId = this.parseStationId();

    return [
      isPassive && (
        <div className="passive-container" key={0}>
          <img src="/img/logo.png" alt="radio-logo" />
        </div>
      ),
      <Row className="m-0 station-container" key={1}>
        <Col xs={12} className="station-browser-container">
          <StationBrowser stationId={stationId} />
        </Col>
        <Col className="p-0 m-auto extra-large-container">
          <Row className="m-0">
            <Col
              xs={12}
              xl={8}
              className={classNames(
                'p-1 p-sm-3 mt-2 pr-xl-0',
                'player-container',
                {
                  'passive-mode': isPassive,
                },
              )}>
              {this._renderPlayer()}
            </Col>
            <Col xs={12} xl={4} className="p-1 p-sm-3 mt-2">
              <div className="playlist-tabs-container">
                <PlaylistTabs stationId={stationId} />
              </div>
            </Col>
            <Col xs={12} className="p-1 p-sm-3 mt-2 mt-sm-0">
              <div className="add-song-container">
                <h1>Add Song</h1>
                <AddSong stationId={stationId} />
              </div>
            </Col>
            <div
              className={classNames('p-0 station-chat-container', {
                'col-10 col-md-8 col-lg-6': toggleChatPopup,
              })}>
              {!toggleChatPopup && (
                <div
                  className="chat-popup-button"
                  onClick={this.toggleChatPopup}>
                  <span>
                    <i className="fa fa-comments" />
                  </span>
                </div>
              )}
              {toggleChatPopup && (
                <div className="chat-popup">
                  <ChatBox
                    stationId={stationId}
                    toggleChatPopup={this.toggleChatPopup}
                  />
                </div>
              )}
            </div>
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
