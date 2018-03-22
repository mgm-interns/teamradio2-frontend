import { Component } from 'react';
import * as React from 'react';
import './StationBrowserItem.scss'

export class StationBrowserItemInfo extends Component {
  render() {
    return (
      <div className="station-thumbnail">
        <img src="https://www.w3schools.com/images/picture.jpg"/>
        <div className="online-user">
          <span> 0 online</span>
        </div>
      </div>
    );
  }
}