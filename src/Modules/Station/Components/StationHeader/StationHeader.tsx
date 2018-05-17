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
}

class OriginStationHeader extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  @Inject('StationServices') private stationServices: StationServices;

  private isMobile: boolean;

  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      station: null,
      currentSkipRule: null,
    };

    this.isMobile = isMobileBrowser();
  }

  public componentWillMount() {
    const { stationId } = this.props;
    this.updateStation(stationId);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stationId: oldStationId } = this.props;
    const { stationId: nextStationId } = nextProps;

    if (oldStationId !== nextStationId) {
      this.updateStation(nextStationId);
    }
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
          {/*<OnlineUsers />*/}
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

  private updateStation = (stationId: string) => {
    this.stationServices.getStationById(stationId).subscribe(
      (station: any) => {
        this.setState({ station });
      },
      (err: string) => {
        this.props.history.replace('/');
      },
    );
  };

  private isOwner() {
    const userInfo = localStorageManager.getUserInfo();
    return userInfo && userInfo.id === this.state.station.ownerId;
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

export const StationHeader = compose(
  connect<IStateProps, any, any>(mapStateToProps),
  withRouter,
)(OriginStationHeader);
