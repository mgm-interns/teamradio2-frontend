import { BaseStationBrowser } from 'BaseComponent/BaseStationBrowser';
import { IApplicationState } from 'Configuration/Redux';
import {
  StationItem,
  StationItemsControlledMap,
  StationItemsMap,
} from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { StationsBrowserSSE } from 'Services/SSE';
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
  public stationsBrowserSSE: StationsBrowserSSE;

  constructor(props: IProps) {
    super(props);
    this.stationsBrowserSSE = new StationsBrowserSSE();
  }

  public componentWillMount() {
    this.setState({ loading: this.props.loading });

    this.stationsBrowserSSE.start();
  }

  public componentWillUnmount() {
    this.stationsBrowserSSE.close();
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
