import { NowPlayingSong, PlaylistSong } from 'Models';

export interface IStationState {
  nowPlaying: NowPlayingSong;
  playlist: PlaylistSong[];
  stationInfo: object;
  joinUser: string[];
  leaveUser: string[];
  error?: string | null;
  loading?: boolean;
}
