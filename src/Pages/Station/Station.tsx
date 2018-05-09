import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { isMobileBrowser, YoutubeHelper } from 'Helpers';
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
      isEnableVideo: !isMobileBrowser(),
      station: null,
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

  public _renderPlayer = () => {
    const { nowPlaying } = this.props;
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
        <NowPlaying muted={muted} isEnableVideo={isEnableVideo} />
        {isPassive && (
          <div className="passive-video-info">
            <p>{nowPlaying.title}</p>
            <p>{YoutubeHelper.convertDuration(nowPlaying.duration)}</p>
          </div>
        )}
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
            <ChatBox stationId={stationId} />
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
