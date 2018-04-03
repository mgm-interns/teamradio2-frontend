import * as React from 'react';
import { Component } from 'react';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  historyList: any[];
}

export class History extends Component<IHistoryProps, any> {
  public render() {
    return (
      <div className="list-container">
        {this.props.historyList.map((song, index) => (
          <HistoryItem key={index} song={song} />
        ))}
      </div>
    );
  }
}
