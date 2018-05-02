import { BaseComponent } from 'BaseComponent';
import { StationBrowserSlider } from 'Components';
import { Station, StationItem } from 'Models';
import { StationBrowserItem } from 'Modules/Station/Components/StationBrowser/StationBrowserItem';
import * as React from 'react';
import { Row } from 'reactstrap';
import { UserServices } from 'Services/Http';

export interface IBaseStationBrowserProps {
  stationId?: string;
}

interface IBaseStationBrowserStates {
  listStation: Station[];
  stationItemContainerRef: HTMLElement;
}

export abstract class BaseStationBrowser extends BaseComponent<
  IBaseStationBrowserProps,
  IBaseStationBrowserStates
> {
  public userServices: UserServices;
  constructor(props: IBaseStationBrowserProps) {
    super(props);

    this.userServices = new UserServices();

    this.state = {
      listStation: [],
      stationItemContainerRef: null,
    };
  }

  public getListStation() {}

  public componentWillMount() {
    this.getListStation();
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
