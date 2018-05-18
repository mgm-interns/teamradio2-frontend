import * as classNames from 'classnames';
import { Dispatch, IApplicationState } from 'Configuration/Redux';
import { isMobileBrowser, YoutubeHelper } from 'Helpers';
import { localStorageManager } from 'Helpers/LocalStorageManager';
import { NowPlayingSong, Station as StationModel, Volume } from 'Models';
import {
  AddSong,
  ChatBox,
  NowPlaying,
  PlaylistTabs,
  StationBrowser,
  StationHeader,
} from 'Modules/Station';
import { setVolume, userMutePlayer } from 'Modules/Station/Redux/Actions';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { compose } from 'redux';
import './Station.scss';

interface IStateProps {
  nowPlaying: NowPlayingSong;
  volume: Volume;
  isUserMutePlayer: boolean;
}

interface IDispatchProps {
  setVolume: (volume: Volume) => void;
  userMutePlayer: (isUserMutePlayer: boolean) => void;
}

interface IOwnProps {}

type IProps = IOwnProps & IStateProps & IDispatchProps;

interface IState {
  playerVolume: boolean;
  previewVolume: boolean;
  isPassive: boolean;
  isEnableVideo: boolean;
  station: StationModel;
  isUserMutePlayer: boolean;
}

class StationComponent extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      playerVolume: true,
      previewVolume: false,
      isPassive: false,
      isEnableVideo: !isMobileBrowser(),
      station: null,
      isUserMutePlayer: false,
    };
  }

  public componentDidMount() {
    // Automatically scroll to top when user open station page
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });

    const { volume } = this.props;
    this.setState({ playerVolume: volume.playerVolume });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (!nextProps.nowPlaying) {
      this.setState({ isPassive: false });
    }

    if (nextProps.volume.playerVolume !== this.props.volume.playerVolume) {
      this.setState({ playerVolume: nextProps.volume.playerVolume });
    }

    if (nextProps.isUserMutePlayer !== this.props.isUserMutePlayer) {
      this.setState({ isUserMutePlayer: nextProps.isUserMutePlayer });
    }
  }

  public onVolumeClick = () => {
    /* tslint:disable no-shadowed-variable */
    const { setVolume, userMutePlayer } = this.props;
    this.setState(
      {
        playerVolume: !this.state.playerVolume,
        previewVolume: false,
      },
      () => {
        const volume = {
          playerVolume: this.state.playerVolume,
          previewVolume: this.state.previewVolume,
          isUserMutePlayer: !this.state.playerVolume,
        };
        userMutePlayer(!this.state.playerVolume);
        setVolume(volume);
        localStorageManager.setVolumeSource(volume);
      },
    );
  };

  public onPreviewVolumeClick = () => {
    /* tslint:disable no-shadowed-variable */
    const { setVolume, isUserMutePlayer } = this.props;
    this.setState(
      {
        previewVolume: !this.state.previewVolume,
      },
      () => {
        this.setState(
          {
            playerVolume: isUserMutePlayer ? false : !this.state.previewVolume,
          },
          () => {
            const volume = {
              playerVolume: this.state.playerVolume,
              previewVolume: this.state.previewVolume,
              isUserMutePlayer,
            };
            setVolume(volume);
            localStorageManager.setVolumeSource(volume);
          },
        );
      },
    );
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
    const { playerVolume, isPassive, isEnableVideo } = this.state;
    const stationId = this.parseStationId();
    return (
      <Fragment>
        <StationHeader
          playerVolume={playerVolume}
          isPassive={isPassive}
          isEnableVideo={isEnableVideo}
          onVolumeClick={this.onVolumeClick}
          onLightClick={this.onLightClick}
          enablePlayer={this.enablePlayer}
          stationId={stationId}
        />
        <NowPlaying playerVolume={playerVolume} isEnableVideo={isEnableVideo} />
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
                <AddSong
                  stationId={stationId}
                  onPreviewVolumeClick={this.onPreviewVolumeClick}
                />
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
  volume: state.volume,
  isUserMutePlayer: state.volume.isUserMutePlayer,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setVolume: (volume: Volume) => {
    dispatch(setVolume(volume));
  },
  userMutePlayer: (isUserMutePlayer: boolean) => {
    dispatch(userMutePlayer(isUserMutePlayer));
  },
});

export const Station = compose(
  connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(StationComponent);
