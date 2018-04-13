import { NowPlayingSong, Song } from 'Models/Song';
import { Station } from 'Models/Station';
import { RegisteredUser } from 'Models/User';

export interface IStationState {
  nowPlaying: NowPlayingSong;
  playlist: Song[];
  station: Station;
  users: RegisteredUser[];
}

export interface ISong {
  song_id?: string;
  title: string;
  isPlaying?: boolean;
  thumbnail: string;
  creator?: object;
  duration: string;
  willBeSkipped?: boolean;
  message?: string;
  upVotes?: number;
  downVotes?: number;
  url: string;
}
