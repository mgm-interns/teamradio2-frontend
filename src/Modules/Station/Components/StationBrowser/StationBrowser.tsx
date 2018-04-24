import { BaseComponent } from 'BaseComponent';
import { StationBrowserSlider } from 'Components';
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

export class StationBrowser extends BaseComponent<IStationBrowserProps, IStationBrowserStates> {
  public stationServices: StationServices;
  private listStationStore: StationItem[];

  constructor(props: IStationBrowserProps) {
    super(props);
    this.stationServices = new StationServices();
    this.state = {
      listStation: [],
      stationItemContainerRef: null,
    };
  }

  public componentWillMount() {
    this.getListStation();
  }

  public componentWillReceiveProps(nextProps: IStationBrowserProps) {
    if(nextProps.stationId !== this.props.stationId) {
      this.updateListStation(this.listStationStore, nextProps.stationId);
    }
  }

  public storeStationList(listStation: StationItem[]) {
    this.listStationStore = listStation;
  }

  public updateListStation(listStationToUpdate: StationItem[], stationIdNeedFilter?: string) {
    const listStationFiltered = listStationToUpdate.filter((station: Station) => {
      return station.friendlyId !== stationIdNeedFilter;
    });
    this.setState({ listStation: listStationFiltered });
  }

  public getListStation() {
    this.stationServices.getListStation().subscribe(
      (listStation: StationItem[]) => {
        this.storeStationList(listStation);
        this.updateListStation(this.listStationStore, this.props.stationId);
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
                {this.state.listStation.map(
                  (item: StationItem, index: number) => {
                    return <StationBrowserItem key={index} {...item} />;
                  },
                )}
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
}
