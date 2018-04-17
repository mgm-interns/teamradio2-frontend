import { Song } from 'Models/Song';
import * as React from 'react';
import { Component } from 'react';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  stationId: string;
}

interface IHistoryState {
  history: Song[];
}

export class History extends Component<IHistoryProps, IHistoryState> {
  private songServices: SongServices;

  constructor(props: any) {
    super(props);
    this.songServices = new SongServices();
    this.state = {
      history: [],
    };
    this.updateHistory = this.updateHistory.bind(this);
    this.replaySong = this.replaySong.bind(this);
  }

  public replaySong(youtubeVideoId: string, message: string) {
    const { stationId } = this.props;
    this.songServices.addSong(stationId, youtubeVideoId, message).subscribe(
      (songResponse: Song) => {},
      (err: any) => {
        console.log(`Replay song error: ${err}`);
      },
    );
  }

  public updateHistory() {
    const { stationId } = this.props;
    this.songServices.getHistory(stationId).subscribe(
      (history: Song[]) => {
        this.setState({
          history
        });
      },
      (err: any) => {
        console.log(`Get history error: ${err}`);
      },
    );
  }

  public componentWillReceiveProps() {
    this.updateHistory();
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.history.map((song, index) => (
          <HistoryItem key={index} song={song} replaySong={this.replaySong} />
        ))}
      </div>
    );
  }
}
