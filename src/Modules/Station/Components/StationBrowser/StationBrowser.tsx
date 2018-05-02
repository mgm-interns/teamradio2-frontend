import { BaseStationBrowser } from 'BaseComponent/BaseStationBrowser';
import { StationBrowserSlider } from 'Components';
import {
  StationItem,
  StationItemsControlledMap,
  StationItemsMap,
} from 'Models';
import * as React from 'react';
import { Row } from 'reactstrap';
import { StationServices } from 'Services/Http';
import './StationBrowser.scss';

export interface IStationBrowserProps {
  stationId?: string;
}

export class StationBrowser extends BaseStationBrowser<IStationBrowserProps> {
  public stationServices: StationServices;

  constructor(props: IStationBrowserProps) {
    super(props);
    this.stationServices = new StationServices();
  }

  public componentWillMount() {
    this.getListStation();
  }

  public updateListStation(listStationToUpdate: StationItemsMap) {
    // Must apply new instance to make sure that
    // react component will trigger render again
    this.setState({
      listStation: new StationItemsControlledMap(listStationToUpdate).toArray(),
    });
  }

  public getListStation() {
    this.stationServices.getListStation().subscribe(
      (listStation: StationItemsMap) => {
        this.updateListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  protected getListItems = () => {
    return this.state.listStation.filter((station: StationItem) => {
      return station.friendlyId !== this.props.stationId;
    });
  };
}
