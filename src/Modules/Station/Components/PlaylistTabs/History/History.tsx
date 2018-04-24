import { BaseComponent } from 'BaseComponent';
import { Song } from 'Models';
import * as React from 'react';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  stationId: string;
  isActive: boolean;
}

interface IHistoryState {
  history: Song[];
}

export class History extends BaseComponent<IHistoryProps, IHistoryState> {
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
      (err: string) => {
        this.showError(`Replay song error: ${err}`);
      },
    );
  }

  public updateHistory() {
    const { stationId } = this.props;
    this.songServices.getListPlayedSong(stationId).subscribe(
      (history: Song[]) => {
        this.setState({
          history,
        });
      },
      (err: string) => {
        this.showError(`Get history error: ${err}`);
      },
    );
  }

  public componentWillReceiveProps(nextProps: IHistoryProps) {
    if (nextProps.isActive) {
      this.updateHistory();
    }
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
