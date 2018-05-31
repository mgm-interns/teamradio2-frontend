import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Song } from 'Models';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { HttpServices, IServerError, SongServices } from 'Services/Http';
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
  @Inject('SongServices') private songServices: SongServices;
  private replaySub: Subscription;
  private getHistorySub: Subscription;

  constructor(props: any) {
    super(props);
    this.state = {
      history: [],
    };
    this.updateHistory = this.updateHistory.bind(this);
    this.replaySong = this.replaySong.bind(this);
  }

  public replaySong(youtubeVideoId: string, message: string) {
    const { stationId } = this.props;
    this.replaySub = this.songServices
      .addSong(stationId, youtubeVideoId, message)
      .subscribe(
        (songResponse: Song) => {},
        (err: IServerError) => {
          this.showError(HttpServices.getServerErrorMessage(err));
        },
      );
  }

  public updateHistory() {
    this.getHistorySub = this.songServices
      .getListPlayedSong(this.props.stationId)
      .subscribe(
        (history: Song[]) => {
          this.setState({
            history,
          });
        },
        (err: IServerError) => {
          // Only for development
          // this.showError(HttpServices.getServerErrorMessage(err));
        },
      );
  }

  public componentDidMount() {
    this.updateHistory();
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IHistoryProps) {
    if (nextProps.stationId !== this.props.stationId) {
      this.clearHistory();
    }

    if (nextProps.isActive) {
      this.updateHistory();
    }
  }

  public componentWillUnmount() {
    this.cancelAllSubscribes();
  }

  public render() {
    const { history } = this.state;
    if (history.length === 0) {
      return (
        <div className="playlist-none">
          <i className="fa fa-warning" />
          <h5>
            There is no song in the history.
            <br />
            Add a new song to the playlist tab then return to here.
          </h5>
        </div>
      );
    }
    return (
      <div className="list-container">
        {history.map((song, index) => (
          <HistoryItem key={index} song={song} replaySong={this.replaySong} />
        ))}
      </div>
    );
  }

  private clearHistory() {
    this.setState({
      history: [],
    });
  }
  private cancelAllSubscribes() {
    if (this.replaySub) {
      this.replaySub.unsubscribe();
    }

    if (this.getHistorySub) {
      this.getHistorySub.unsubscribe();
    }
  }
}
