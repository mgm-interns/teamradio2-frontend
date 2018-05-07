import { BaseComponent } from 'BaseComponent';
import { StationBrowserSlider } from 'Components';
import { inject } from 'Configuration/DI';
import { Station, StationItem } from 'Models';
import * as React from 'react';
import { Row } from 'reactstrap';
import { StationServices } from 'Services/Http';
import './StationBrowser.scss';
import { StationBrowserItem } from './StationBrowserItem';

export interface IStationBrowserProps {
  stationId?: string;
}

interface IStationBrowserStates {
  listStation: StationItem[];
  stationItemContainerRef: HTMLElement;
}

export class StationBrowser extends BaseComponent<
  IStationBrowserProps,
  IStationBrowserStates
> {
  @inject('StationServices') public stationServices: StationServices;

  constructor(props: IStationBrowserProps) {
    super(props);

    this.state = {
      listStation: [],
      stationItemContainerRef: null,
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public updateListStation(listStationToUpdate: StationItem[]) {
    this.setState({ listStation: listStationToUpdate });
  }

  public getListStation() {
    this.stationServices.getListStation().subscribe(
      (listStation: StationItem[]) => {
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
          <div className="m-auto extra-large-container cover-div">
            <StationBrowserSlider
              stationItemContainer={this.state.stationItemContainerRef}
            />
            <div className="list-station">
              <div
                className="station-item-container"
                ref={this.bindStationItemContainerRef}>
                {listStationFiltered.map((item: StationItem, index: number) => {
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
    listStation: StationItem[],
    stationIdToFilter: string,
  ) {
    return listStation.filter((station: Station) => {
      return station.friendlyId !== stationIdToFilter;
    });
  }
}
