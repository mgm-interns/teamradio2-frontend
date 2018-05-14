import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux';
import { isMobileBrowser, localStorageManager } from 'Helpers';
import { ISkipRule, SkipRuleType, Song, Station } from 'Models';
import { OnlineUsers, StationSharing } from 'Modules/Station';
import { Fragment } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Row } from 'reactstrap';
import { compose } from 'redux';
import { StationServices } from 'Services/Http';
import { StationSSEService } from 'Services/SSE';
import { ConfigurationButton } from '../ConfigurationButton';
import './StationHeader.scss';

const buttonActions = {
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
  player: {
    iconOn: 'fa fa-music',
    iconOff: 'fa fa-music',
  },
};

export interface ISkipRuleRadio extends ISkipRule {
  checked: boolean;
}

interface IStateProps {
  nowPlaying?: Song;
  stationInfo: any;
  joinUser: string;
  leaveUser: string;
}

interface IOwnProps {
  muted: boolean;
  isPassive: boolean;
  isEnableVideo: boolean;
  onVolumeClick: (e: React.FormEvent<EventTarget>) => void;
  onLightClick: (e: React.FormEvent<EventTarget>) => void;
  enablePlayer: (e: React.FormEvent<EventTarget>) => void;
  stationId: string;
}

type IProps = IStateProps & IOwnProps;

interface IState {
  station: Station;
  currentSkipRule: ISkipRuleRadio;
}

class OriginStationHeader extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  @Inject('StationServices') private stationServices: StationServices;
  @Inject('StationSSEService') private stationSSEService: StationSSEService;

  private isMobile: boolean;

  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      station: null,
      currentSkipRule: null,
    };

    this.isMobile = isMobileBrowser();
  }

  public componentDidMount() {
    const { stationId } = this.props;
    this.startSSEService(stationId);
  }

  public componentWillUnmount() {
    this.stationSSEService.close();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stationId: oldStationId, stationInfo: oldStationInfo } = this.props;
    const {
      stationId: nextStationId,
      stationInfo: nextStationInfo,
      joinUser,
      leaveUser,
    } = nextProps;

    if (oldStationId !== nextStationId) {
      this.updateStation(nextStationId);
    }

    if (oldStationInfo !== nextStationInfo) {
      this.updateStationInfo(nextStationInfo);
    }

    this.handleJoinAndLeaveUser(joinUser, leaveUser);
  }

  public _onSkipRuleChange = (skipRuleType: SkipRuleType) => {
    const { stationId } = this.props;

    this.stationServices
      .updateSkipRuleConfig(stationId, skipRuleType)
      .subscribe(
        (response: any) => {
          this.setState({
            currentSkipRule: { ...response.skipRule, checked: true },
          });
        },
        (err: string) => {
          this.showError(err);
        },
      );
  };

  public _renderButton = (
    flag: boolean,
    { iconOn, iconOff }: any,
    handleClick: any,
    className: string = undefined,
  ) => {
    const classes = {
      icon: classNames(flag ? iconOn : iconOff),
    };

    return (
      <div
        className={classNames('icon-wrapper', className)}
        onClick={handleClick}>
        <i
          className={classNames([classes.icon, { activeButton: flag }, 'icon'])}
        />
      </div>
    );
  };

  public render() {
    const {
      muted,
      isPassive,
      isEnableVideo,
      onVolumeClick,
      onLightClick,
      enablePlayer,
      nowPlaying,
      stationId,
    } = this.props;
    const { station, currentSkipRule } = this.state;

    return (
      <Row className="header-container">
        <div
          className={classNames(
            'header-wrapper',
            this.isMobile ? 'is-mobile' : '',
          )}>
          <h1>{station && station.name}</h1>
          <OnlineUsers data={station} />
        </div>
        <div className="buttons-wrapper">
          {nowPlaying &&
            isEnableVideo && (
              <Fragment>
                {this._renderButton(
                  !muted,
                  buttonActions.muted,
                  onVolumeClick,
                  'station-mute-button',
                )}
                {this._renderButton(
                  isPassive,
                  buttonActions.passive,
                  onLightClick,
                )}
              </Fragment>
            )}
          {!isPassive &&
            !this.isMobile &&
            this._renderButton(
              isEnableVideo,
              buttonActions.player,
              enablePlayer,
            )}
          {!isPassive && (
            <Fragment>
              <StationSharing />
              {station &&
                this.isLoggedIn() &&
                this.isOwner() && (
                  <ConfigurationButton
                    stationId={stationId}
                    currentSkipRule={currentSkipRule}
                    onSkipRuleChange={(skipRuleType: SkipRuleType) =>
                      this._onSkipRuleChange(skipRuleType)
                    }
                  />
                )}
            </Fragment>
          )}
        </div>
      </Row>
    );
  }

  private startSSEService(stationId: string) {
    this.stationSSEService.initiate(stationId);
    this.stationSSEService.start();
  }

  private updateStation = (stationId: string) => {
    if (this.stationSSEService) {
      this.stationSSEService.close();
      this.startSSEService(stationId);
    } else {
      this.startSSEService(stationId);
    }
  };

  private updateStationInfo = (stationInfo: Station) => {
    this.setState({
      station: stationInfo,
    });
  };

  private isOwner() {
    const userInfo = localStorageManager.getUserInfo();
    return userInfo && userInfo.id === this.state.station.ownerId;
  }

  private handleJoinAndLeaveUser = (joinUser: string, leaveUser: string) => {
    console.log('joinUser', joinUser, 'leaveUser', leaveUser);
    if (joinUser) {
      this.showInfo(`${joinUser} joined`);
    } else if (leaveUser) {
      this.showInfo(`${leaveUser} leaved`);
    }
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.station.nowPlaying,
  stationInfo: state.station.stationInfo,
  joinUser: state.station.joinUser,
  leaveUser: state.station.leaveUser,
});

export const StationHeader = compose(
  connect<IStateProps, any, any>(mapStateToProps),
  withRouter,
)(OriginStationHeader);
