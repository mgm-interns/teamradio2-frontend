import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Song } from 'Models';
import * as React from 'react';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

interface IHistoryProps {
  stationId: string;
  isActive: boolean;
  isSwitchStation: boolean;
  updateIsSwitchStation: (newValue: boolean) => void;
}

interface IHistoryState {
  history: Song[];
}

export class History extends BaseComponent<IHistoryProps, IHistoryState> {
  @Inject('SongServices') private songServices: SongServices;

  constructor(props: any) {
    super(props);
    this.state = {
      history: [],
    };
    this.updateHistory = this.updateHistory.bind(this);
    this.replaySong = this.replaySong.bind(this);
  }

  public componentDidMount() {
    this.updateHistory();
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
    if (nextProps.isActive || nextProps.isSwitchStation) {
      this.updateHistory();
      this.props.updateIsSwitchStation(false);
    }
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
}
