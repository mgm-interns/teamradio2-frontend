import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Dispatch, IApplicationState } from 'Configuration/Redux';
import { localStorageManager } from 'Helpers';
import { SkipRule, Song, Station } from 'Models';
import { SkipRuleType } from 'Models/Station';
import { ConfigurationButton, StationSharing } from 'Modules/Station';
import { toggleQRCode } from 'Modules/Station/Redux/Actions';
import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Row } from 'reactstrap';
import { compose } from 'redux';
import { StationServices } from 'Services/Http';
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
  qrcode: {
    iconOn: 'fa fa-qrcode',
    iconOff: 'fa fa-qrcode',
  },
};

interface IStateProps {
  nowPlaying?: Song;
}

interface IDispatchProps {
  toggleQRCode: (isToggleQRCode: boolean) => void;
}

interface IOwnProps {
  muted: boolean;
  isPassive: boolean;
  onVolumeClick: (e: React.FormEvent<EventTarget>) => void;
  onLightClick: (e: React.FormEvent<EventTarget>) => void;
  stationId: string;
}

type IProps = IStateProps & IDispatchProps & IOwnProps;

interface IState {
  station: Station;
  currentSkipRule: SkipRule;
  isToggleQRCode: boolean;
}

class OriginStationHeader extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  private stationServices: StationServices;
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      station: null,
      currentSkipRule: null,
      isToggleQRCode: false,
    };

    this.stationServices = new StationServices();
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

  public _onSkipRuleChange = (skipRuleTpe: SkipRuleType) => {
    const { stationId } = this.props;
    const { station } = this.state;

    this.stationServices
      .updateSkipRuleConfig(stationId, skipRuleTpe)
      .subscribe(
        (response: any) => {
          // Re-set current skip rule after user change Skip rule Configuration
          this.setState({ currentSkipRule: response.skipRule });
        },
        err => console.log(err),
      );
  };

  public _onQRCodeToggle = () => {
    this.setState(
      {
        isToggleQRCode: !this.state.isToggleQRCode,
      },
      () => {
        this.props.toggleQRCode(this.state.isToggleQRCode);
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
      onVolumeClick,
      onLightClick,
      nowPlaying,
      stationId,
    } = this.props;
    const { station, currentSkipRule, isToggleQRCode } = this.state;

    const userInfo = localStorageManager.getUserInfo();

    return (
      <Row className="station-header-container">
        <div>
          <h1>{station && station.name}</h1>
        </div>
        <div className="buttons-wrapper">
          {this._renderButton(
            !muted,
            buttonActions.muted,
            onVolumeClick,
            'station-mute-button',
          )}
          {nowPlaying &&
            this._renderButton(isPassive, buttonActions.passive, onLightClick)}
          {!isPassive && (
            <Fragment>
              <StationSharing />
              {station && userInfo.id === station.ownerId && (
                <ConfigurationButton
                  stationId={stationId}
                  currentSkipRule={currentSkipRule}
                  onSkipRuleChange={(skipRuleType: SkipRuleType) =>
                    this._onSkipRuleChange(skipRuleType)
                  }
                />
              )}
              {this._renderButton(
                isToggleQRCode,
                buttonActions.qrcode,
                this._onQRCodeToggle,
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
        this.setState({ station }, () => {
          // Get current skip rule after join in a station
          this.setState({
            currentSkipRule: this.state.station.stationConfigurationDTO
              .skipRule,
          });
        });
      },
      err => {
        // If station not found, redirect user to home page
        this.props.history.replace('/');
      },
    );
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  toggleQRCode: (isToggleQRCode: boolean) =>
    dispatch(toggleQRCode(isToggleQRCode)),
});

export const StationHeader = compose(
  connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(OriginStationHeader);
