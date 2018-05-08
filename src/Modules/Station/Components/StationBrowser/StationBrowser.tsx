import { Inject } from 'Configuration/DependencyInjection';
import { IApplicationState } from 'Configuration/Redux';
import {
  StationItem,
  StationItemsControlledMap,
  StationItemsMap,
} from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  DEFAULT_STATIONS_PAGE_SIZE,
  StationsBrowserSSE,
  StationsBrowserSSEStatus,
} from 'Services/SSE';
import {
  BaseStationBrowser,
  IBaseStationBrowserStates,
} from './BaseStationBrowser';
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

class OriginStationBrowser extends BaseStationBrowser<IProps> {
  @Inject('StationsBrowserSSE') private stationsBrowserSSE: StationsBrowserSSE;

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

  public componentWillUpdate(
    nextProps: IProps,
    nextState: IBaseStationBrowserStates,
  ) {
    const { listStation: currentStations } = this.state;
    const { listStation: nextStations } = nextState;
    // if the stations list change the length
    // this mean that the limit of API has change
    // not the array changed
    if (currentStations.length !== nextStations.length) {
      this.scrollToLatestPage();
    }
  }

  protected scrollToLatestPage = () => {
    // Need to push this function to the bottom of the runtime queue
    // To make sure that the station-item has been rendered
    setTimeout(() => {
      const { listStation } = this.state;
      const stationItem = document.getElementsByClassName('station-item')[0];
      const stationItemWidth = stationItem.clientWidth;
      const newScrollingIndex = listStation.length - DEFAULT_STATIONS_PAGE_SIZE;

      this.stationBrowserSliderRef.scroll(stationItemWidth * newScrollingIndex);
    });
  };

  protected onEndReach = () => {
    // Only dispatch increasing limit if the list station is
    // match with the limit value of current SSE instance
    if (this.state.listStation.length >= this.stationsBrowserSSE.limit) {
      this.stationsBrowserSSE.increaseLimit();
    }
  };

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
