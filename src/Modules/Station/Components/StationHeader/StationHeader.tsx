import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { localStorageManager } from 'Helpers';
import { ISkipRule, SkipRuleType, Song, Station } from 'Models';
import { StationSharing } from 'Modules/Station';
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
  muted: {
    iconOn: 'fa fa-volume-up',
    iconOff: 'fa fa-volume-off',
  },
  passive: {
    iconOn: 'fa fa-lightbulb-o',
    iconOff: 'fa fa-lightbulb-o',
  },
};

export interface ISkipRuleRadio extends ISkipRule {
  checked: boolean;
}

interface IStateProps {
  nowPlaying?: Song;
}

interface IOwnProps {
  muted: boolean;
  isPassive: boolean;
  onVolumeClick: (e: React.FormEvent<EventTarget>) => void;
  onLightClick: (e: React.FormEvent<EventTarget>) => void;
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
  private stationServices: StationServices;
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      station: null,
      currentSkipRule: null,
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

    this.stationServices.updateSkipRuleConfig(stationId, skipRuleTpe).subscribe(
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
      onVolumeClick,
      onLightClick,
      nowPlaying,
      stationId,
    } = this.props;
    const { station, currentSkipRule } = this.state;

    const userInfo = localStorageManager.getUserInfo();

    return (
      <Row className="header-container">
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
              {station &&
                userInfo.id === station.ownerId && (
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
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  nowPlaying: state.playlist.nowPlaying,
});

export const StationHeader = compose(
  connect<IStateProps, any, any>(mapStateToProps),
  withRouter,
)(OriginStationHeader);
