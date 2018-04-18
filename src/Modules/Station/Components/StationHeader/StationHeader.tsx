import * as classNames from 'classnames';
import { IApplicationState } from 'Configuration/Redux';
import { Song, Station } from 'Models';
import { ConfigurationButton, StationSharing } from 'Modules/Station';
import * as React from 'react';
import { Component } from 'react';
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
};

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
}

class OriginStationHeader extends Component<
  IProps & RouteComponentProps<any>,
  IState
> {
  private stationServices: StationServices;
  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.state = {
      station: null,
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
    const {
      muted,
      isPassive,
      onVolumeClick,
      onLightClick,
      nowPlaying,
    } = this.props;
    const { station } = this.state;

    return (
      <Row className="header-container">
        <div>
          <h1>{station && station.name}</h1>
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

  private updateStation = (stationId: string) => {
    this.stationServices.getStationById(stationId).subscribe(
      (station: any) => {
        this.setState({ station });
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

export const StationHeader = compose(
  connect<IStateProps, any, any>(mapStateToProps),
  withRouter,
)(OriginStationHeader);
