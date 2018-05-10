import { BaseComponent } from 'BaseComponent';
import { StationBrowserSlider } from 'Components';
import { StationItem } from 'Models';
import { StationBrowserItem } from 'Modules/Station/Components/StationBrowser/StationBrowserItem';
import * as React from 'react';
import { Row } from 'reactstrap';

export interface IBaseStationBrowserStates {
  listStation: StationItem[];
  stationItemContainerRef: HTMLElement;
  loading: boolean;
}

export abstract class BaseStationBrowser<T> extends BaseComponent<
  T,
  IBaseStationBrowserStates
> {
  protected stationBrowserSliderRef: StationBrowserSlider;

  constructor(props: T) {
    super(props);

    this.state = {
      listStation: [],
      stationItemContainerRef: null,
      loading: false,
    };
  }

  public render() {
    const listItems = this.getListItems();
    if (this.state.loading || listItems.length === 0) {
      return this.renderListNoStation();
    }
    return this.renderListStation();
  }

  protected renderListStation = () => {
    const listItems = this.getListItems();
    return (
      <Row className="m-0 justify-content-center justify-content-center">
        <div className="col-xl-12 browser">
          <div className="m-auto extra-large-container cover-div">
            <StationBrowserSlider
              stationItemContainer={this.state.stationItemContainerRef}
              onEndReach={this.onEndReach}
              ref={this.bindStationBrowserSlider}
            />
            <div className="list-station">
              <div
                className="station-item-container"
                ref={this.bindStationItemContainerRef}>
                {listItems.map((item: StationItem, index: number) => {
                  return <StationBrowserItem key={index} {...item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  };

  protected renderListNoStation = () => {
    return (
      <div className="station-browser-loading-container">
        <Row className="m-0 justify-content-center justify-content-center">
          <div className="col-xl-12 browser">
            <div className="cover-div">
              <div className="m-auto extra-large-container list-station">
                {this.state.loading
                  ? this.renderListStationLoading()
                  : this.renderListStationEmpty()}
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  };

  protected renderListStationLoading = () => {
    const listItems = Array.from({ length: 14 });
    return (
      <div
        className="station-item-container"
        ref={this.bindStationItemContainerRef}>
        {listItems.map((item, index) => (
          <div
            className="station-browser-loading-item station-item"
            key={index}>
            <div className="thumbnail" />
            <div className="station-name" />
          </div>
        ))};
      </div>
    );
  };

  protected renderListStationEmpty = () => {
    const listItems = Array.from({ length: 6 });
    return (
      <div
        className="station-item-container"
        ref={this.bindStationItemContainerRef}>
        {listItems.map((item, index) => (
          <div className="station-browser-empty-item station-item" key={index}>
            <div className="thumbnail" />
            <div className="station-name" />
          </div>
        ))}
        <span className="station-browser-empty-message">
          {this.getNoStationFoundMessage()}
        </span>
      </div>
    );
  };

  protected getNoStationFoundMessage() {
    return '';
  }

  protected onEndReach = () => {
    console.log('trigger fetch more');
  };

  protected getListItems = (): StationItem[] => {
    return this.state.listStation;
  };

  private bindStationItemContainerRef = (node: HTMLElement) => {
    this.setState({
      stationItemContainerRef: node,
    });
  };

  private bindStationBrowserSlider = (node: StationBrowserSlider) => {
    this.stationBrowserSliderRef = node;
  };
}
