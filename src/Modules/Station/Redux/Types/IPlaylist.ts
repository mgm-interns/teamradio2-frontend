import { NowPlayingSong, PlaylistSong } from 'Models';

export interface IPlaylistState {
  nowPlaying: NowPlayingSong;
  playlist: PlaylistSong[];
  error?: string | null;
  loading?: boolean;
}
