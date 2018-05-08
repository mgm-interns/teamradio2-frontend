import * as React from 'react';
import { Component } from 'react';
import './StationBrowserSlider.scss';

interface IStationBrowserSliderProps {
  stationItemContainer: HTMLElement;
  onEndReach?: () => void;
}

interface IStationBrowserSliderStates {}

export class StationBrowserSlider extends Component<
  IStationBrowserSliderProps,
  IStationBrowserSliderStates
> {
  constructor(props: IStationBrowserSliderProps) {
    super(props);
  }
  public scrollRight = () => {
    if (this.props.onEndReach && this.isReachingScrollThreshold()) {
      this.props.onEndReach();
    }
    this.scroll(this.getCurrentScrollValue() + this.getNextScrollingValue());
  };

  public scrollLeft = () => {
    this.scroll(this.getCurrentScrollValue() - this.getNextScrollingValue());
  };

  public getCurrentScrollValue = () => {
    return this.props.stationItemContainer.scrollLeft;
  };

  public getNextScrollingValue = () => {
    return this.props.stationItemContainer.clientWidth;
  };

  public scroll = (to: number) => {
    const { stationItemContainer } = this.props;

    stationItemContainer.scroll({
      left: to,
    });
  };

  public render() {
    return (
      <div className="station-browser-slider">
        <nav className="nav-circle">
          <a className="prev" onClick={this.scrollLeft}>
            <span className="icon-wrap" />
          </a>
          <a className="next" onClick={this.scrollRight}>
            <span className="icon-wrap" />
          </a>
        </nav>
      </div>
    );
  }
  private isReachingScrollThreshold = () => {
    const {
      scrollWidth: containerWidth,
      clientWidth: pageWidth,
    } = this.props.stationItemContainer;
    const currentScroll = this.getCurrentScrollValue();
    if (currentScroll + pageWidth >= containerWidth) {
      return true;
    }
    return false;
  };
}
