import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux';
import { isMobileBrowser, localStorageManager } from 'Helpers';
import { ISkipRule, RegisteredUser, SkipRuleType, Song, Station } from 'Models';
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
  playerVolume: {
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
  joinUser: string[];
  leaveUser: string[];
  userInfo?: RegisteredUser;
}

interface IOwnProps {
  playerVolume: boolean;
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
  joinUser: string[];
  leaveUser: string[];
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
      joinUser: null,
      leaveUser: null,
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
      joinUser: newJoinUser,
      leaveUser: newLeaveUser,
    } = nextProps;

    this.handleSwitchStation(oldStationId, nextStationId);
    this.handleChangeStationInfo(oldStationInfo, nextStationInfo);
    this.handleJoinAndLeave(newJoinUser, newLeaveUser);
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
      playerVolume,
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
          <OnlineUsers station={station} />
        </div>
        <div className="buttons-wrapper">
          {nowPlaying &&
            isEnableVideo && (
              <Fragment>
                {this._renderButton(
                  playerVolume,
                  buttonActions.playerVolume,
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
              <StationSharing stationId={stationId} />
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

  private handleSwitchStation(oldStationId: string, nextStationId: string) {
    if (oldStationId !== nextStationId) {
      this.updateStation(nextStationId);
    }
  }

  private handleChangeStationInfo(
    oldStationInfo: Station,
    nextStationInfo: Station,
  ) {
    if (oldStationInfo !== nextStationInfo) {
      this.updateStationInfo(nextStationInfo);
    }
  }

  private handleJoinAndLeave(newJoinUser: string[], newLeaveUser: string[]) {
    const { userInfo: currentUser } = this.props;

    if (newLeaveUser !== this.state.leaveUser && newLeaveUser) {
      this.setState({ joinUser: newLeaveUser });
      this.showMessage(newLeaveUser, 'left');
    }

    if (newJoinUser !== this.state.joinUser && newJoinUser) {
      this.setState({ joinUser: newJoinUser });
      this.showMessage(newJoinUser, 'joined');
    }
  }

  private isCurrentUser(name: string) {
    const { userInfo: currentUser } = this.props;
    return name === currentUser.name;
  }

  private showMessage(listUser: string[], type: string) {
    listUser.forEach(user => {
      if (!this.isCurrentUser(user)) {
        this.showInfo(`${user} has ${type}`);
      }
    });
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.station.nowPlaying,
  stationInfo: state.station.stationInfo,
  joinUser: state.station.joinUser,
  leaveUser: state.station.leaveUser,
  userInfo: state.user.userInfo,
});

export const StationHeader = compose(
  connect<IStateProps, any, any>(mapStateToProps),
  withRouter,
)(OriginStationHeader);
