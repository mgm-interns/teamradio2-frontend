import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux';
import {
  StationItem,
  StationItemsControlledMap,
  StationItemsMap,
} from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { StationsBrowserSSE, StationsBrowserSSEStatus } from 'Services/SSE';
import { BaseStationBrowser } from './BaseStationBrowser';
import './StationBrowser.scss';

interface IOwnProps {
  stationId?: string;
}

interface IStateProps {
  stations: StationItemsMap;
  loading: boolean;
}

interface IDispatchProps {}

type IProps = IOwnProps & IStateProps & IDispatchProps;

export class OriginStationBrowser extends BaseStationBrowser<IProps> {
  @Inject('StationsBrowserSSE') private stationsBrowserSSE: StationsBrowserSSE;

  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    if (StationsBrowserSSE.status === StationsBrowserSSEStatus.starting) {
      this.updateListStation(this.props.stations);
      return;
    }

    this.setState({ loading: this.props.loading });

    if (
      StationsBrowserSSE.status === StationsBrowserSSEStatus.not_initiated_yet
    ) {
      this.stationsBrowserSSE.initiate();
    }
    if (
      StationsBrowserSSE.status === StationsBrowserSSEStatus.not_started_yet
    ) {
      this.stationsBrowserSSE.start();
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { stations: currentStations } = this.props;
    const { stations: nextStations } = nextProps;
    if (currentStations !== nextStations) {
      this.updateListStation(nextStations);
    }

    const { loading: currentLoading } = this.props;
    const { loading: nextLoading } = nextProps;
    if (currentLoading !== nextLoading) {
      this.setState({ loading: nextLoading });
    }
  }

  protected updateListStation(listStationToUpdate: StationItemsMap) {
    // Must apply new instance to make sure that
    // react component will trigger render again
    this.setState({
      listStation: new StationItemsControlledMap(listStationToUpdate).toArray(),
    });
  }

  protected getListItems = () => {
    return this.state.listStation.filter((station: StationItem) => {
      return station.friendlyId !== this.props.stationId;
    });
  };
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  stations: state.stations.data,
  loading: state.stations.loading,
});

export const StationBrowser = connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
)(OriginStationBrowser);
