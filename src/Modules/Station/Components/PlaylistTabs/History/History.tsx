import * as React from 'react';
import { Component } from 'react';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  historyList: any[];
}

export class History extends Component<IHistoryProps, IHistoryProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      historyList: props.historyList,
    };
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.historyList.map((song, index) => (
          <HistoryItem key={index} song={song} />
        ))}
      </div>
    );
  }

  public addSongToHistory(song: any) {
    const oldHistory = this.state.historyList.slice(0);
    this.setState({
      historyList: [song, ...oldHistory],
    });
  }
}
