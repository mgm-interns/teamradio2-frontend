import * as React from 'react';
import { Component } from 'react';
import './StationBrowserSlider.scss';

interface IStationBrowserSliderProps {
  stationBrowser: string,
  stationItemContainer: string
}

interface IStationBrowserSliderStates {
  fromPosition: number,
  toPosition: number,
  isSliding: boolean,
  stationBrowser: string,
  stationItemContainer: string,
  sliderEffect: string,
  keyFrames: any
}

export class StationBrowserSlider extends Component <IStationBrowserSliderProps, IStationBrowserSliderStates> {
  constructor(props: IStationBrowserSliderProps) {
    super(props);
    this.state = {
      fromPosition: 0,
      toPosition: 0,
      isSliding: false,
      stationBrowser: null,
      stationItemContainer: null,
      keyFrames: null,
      sliderEffect: 'station-browser-slider'
    };
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }

  public componentWillMount() {
    const keyFrames = this.findCssKeyframes(this.state.sliderEffect);
    const {stationBrowser, stationItemContainer} = this.props;
    this.setState({
      keyFrames,
      stationBrowser,
      stationItemContainer
    });
  }

  public scrollLeft() {
    if (this.state.isSliding) {
      return;
    }
    const scrollSize = document.getElementById(this.state.stationBrowser).offsetWidth;
    const fromPosition = this.state.fromPosition;
    let toPosition = fromPosition - scrollSize;
    if (toPosition < 0) {
      toPosition = 0;
    }
    this.slider(fromPosition, toPosition);
  }

  public scrollRight() {
    if (this.state.isSliding) {
      return;
    }
    const scrollSize = document.getElementById(this.state.stationBrowser).offsetWidth;
    const stationItemContainerSize = document.getElementById(this.state.stationItemContainer).offsetWidth;
    const fromPosition = this.state.fromPosition;
    let toPosition = fromPosition + scrollSize;
    const maxToPosition = stationItemContainerSize - scrollSize;
    if (toPosition > maxToPosition) {
      toPosition = maxToPosition;
    }
    this.slider(fromPosition, toPosition);
  }

  public slider(fromPosition: number, toPosition: number) {
    this.setState({
      isSliding: true
    });
    const keyFrames = this.state.keyFrames;
    for (const keyFrame of keyFrames) {
      keyFrame.deleteRule("0%");
      keyFrame.deleteRule("100%");
      keyFrame.appendRule("0% { left: -" + fromPosition + "px; }");
      keyFrame.appendRule("100% { left: -" + toPosition + "px; }");
    }
    const stationItemContainer = document.getElementById(this.state.stationItemContainer);
    stationItemContainer.className += ' ' + this.state.sliderEffect;
    this.setState({
      fromPosition: toPosition
    });
    setTimeout(() => {
      stationItemContainer.style.left = '-' + toPosition + 'px';
      stationItemContainer.classList.remove(this.state.sliderEffect);
      this.setState({
        isSliding: false
      });
    }, 500)
  }

  public findCssKeyframes(cssKeyFrame: string) {
    const keyframes = [];
    const styleSheets = (document.styleSheets as any);
    for (const styleSheet of styleSheets) {
      for (const cssRule of styleSheet.cssRules) {
        if (cssRule.name === cssKeyFrame && cssRule.type === CSSRule.KEYFRAMES_RULE) {
          keyframes.push(cssRule);
        }
      }
    }
    return keyframes;
  }

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
    )
  }
}
