import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { Song } from 'Models/Song';
import { Station } from 'Models/Station';
import { RegisteredUser } from 'Models/User';
import { ConfigurationButton, StationSharing } from 'Modules/Station';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { StationSSE } from 'Services/SSE';
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

interface IStateProps {
  station: Station;
  users: RegisteredUser[];
  nowPlaying?: Song;
}

interface IOwnProps {
  muted: boolean;
  isPassive: boolean;
  onVolumeClick: (e: React.FormEvent<EventTarget>) => void;
  onLightClick: (e: React.FormEvent<EventTarget>) => void;
  stationId: string;
}

type IProps = IOwnProps & IStateProps;

class OriginStationHeader extends Component<IProps, any> {
  private stationSSE: StationSSE;
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    const { stationId } = this.props;
    this.startSSEService(stationId);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stationId: oldStationId } = this.props;
    const { stationId: nextStationId } = nextProps;

    if (oldStationId !== nextStationId) {
      this.updateStation(nextStationId);
    }
  }

  public componentWillUnmount() {
    this.stationSSE.close();
  }

  public renderButton = (
    flag: boolean,
    { iconOn, iconOff }: any,
    handleClick: any,
  ) => {
    const classes = {
      icon: classNames(flag ? iconOn : iconOff),
    };
    // const activeButton = flag ? 'color: red' : null;

    return (
      <div className="icon-wrapper" onClick={handleClick}>
        <i
          className={classNames([classes.icon, { activeButton: flag }, 'icon'])}
        />
      </div>
    );
  };

  public render() {
    const { name } = this.props.station;
    const {
      muted,
      isPassive,
      onVolumeClick,
      onLightClick,
      nowPlaying,
    } = this.props;

    return (
      <Row className="header-container">
        <div>
          <h1>{name || ''}</h1>
        </div>
        <div className="buttons-wrapper">
          {this.renderButton(!muted, buttonActions.muted, onVolumeClick)}
          {nowPlaying &&
            this.renderButton(isPassive, buttonActions.passive, onLightClick)}
          <StationSharing />
          <ConfigurationButton />
        </div>
      </Row>
    );
  }

  private startSSEService(stationId: string) {
    this.stationSSE = new StationSSE(stationId);
    this.stationSSE.start();
  }

  private updateStation = (stationId: string) => {
    this.startSSEService(stationId);
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => {
  return {
    station: state.station.station,
    users: state.station.users,
    nowPlaying: state.station.nowPlaying,
  };
};

export const StationHeader = connect<IStateProps, {}, IOwnProps>(
  mapStateToProps,
  null,
)(OriginStationHeader);
