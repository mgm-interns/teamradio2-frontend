import { BaseComponent } from 'BaseComponent';
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
import { StationBrowserItem } from './StationBrowserItem';

export interface IStationBrowserProps {
  stationId?: string;
}

interface IStationBrowserStates {
  listStation: StationItemsControlledMap;
  stationItemContainerRef: HTMLElement;
}

export class StationBrowser extends BaseComponent<
  IStationBrowserProps,
  IStationBrowserStates
> {
  public stationServices: StationServices;

  constructor(props: IStationBrowserProps) {
    super(props);
    this.stationServices = new StationServices();
    this.state = {
      listStation: new StationItemsControlledMap(),
      stationItemContainerRef: null,
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public updateListStation(listStationToUpdate: StationItemsMap) {
    // Must apply new instance to make sure that
    // react component will trigger render again
    this.setState({
      listStation: new StationItemsControlledMap(listStationToUpdate),
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

  public render() {
    if (this.state.listStation.length === 0) {
      return null;
    }
    const listStationFiltered = this.filterListStation(
      this.state.listStation,
      this.props.stationId,
    );
    return (
      <Row className="m-0 justify-content-center justify-content-center">
        <div className="col-xl-12 browser">
          <div className="cover-div">
            <StationBrowserSlider
              stationItemContainer={this.state.stationItemContainerRef}
            />
            <div className="m-auto extra-large-container list-station">
              <div
                className="station-item-container"
                ref={this.bindStationItemContainerRef}>
                {listStationFiltered.map((item, index) => {
                  return <StationBrowserItem key={index} {...item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }

  private bindStationItemContainerRef = (node: HTMLElement) => {
    this.setState({
      stationItemContainerRef: node,
    });
  };

  private filterListStation(
    listStation: StationItemsControlledMap,
    stationIdToFilter: string,
  ): StationItem[] {
    return listStation.toArray().filter((station: StationItem) => {
      return station.friendlyId !== stationIdToFilter;
    });
  }
}
