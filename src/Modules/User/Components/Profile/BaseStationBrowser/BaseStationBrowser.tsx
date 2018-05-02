import { BaseComponent } from 'BaseComponent/index';
import { StationBrowserSlider } from 'Modules/User/Components/Components';
import { Station, StationItem } from 'Models/index';
import { StationBrowserItem } from 'Modules/Station/Components/StationBrowser/StationBrowserItem/index';
import * as React from 'react';
import { Row } from 'reactstrap';
import { UserServices } from 'Services/Http/index';

export interface IProps {
  stationId?: string;
}

interface IStates {
  listStation: Station[];
  stationItemContainerRef: HTMLElement;
}

export abstract class BaseStationBrowser extends BaseComponent<
  IProps,
  IStates
> {
  constructor(props: IProps) {
    super(props);

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
