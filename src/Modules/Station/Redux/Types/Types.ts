import { NowPlayingSong, Song } from 'Models/Song';
import { RegisteredUser } from "../../../../Models/User";

export interface IPlaylistState {
  nowPlaying: NowPlayingSong;
  playlist: Song[];
  error?: string | null;
  loading?: boolean;
}

export interface ISong {
  song_id?: string;
  title: string;
  isPlaying?: boolean;
  creator?: object;
  duration: string;
  willBeSkipped?: boolean;
  message?: string;
  upVotes?: number;
  downVotes?: number;
  url: string;
}

export interface IUser {
  userInfo: RegisteredUser;
}

