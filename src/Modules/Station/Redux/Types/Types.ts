export interface IPlaylistState {
  data: Array<any>;
  error?: string | null;
  loading?: boolean;
}

export interface ISong {
  song_id?: string;
  title: string;
  isPlaying?: boolean,
  thumbnail: string;
  creator?: object;
  duration: string;
  willBeSkipped?: boolean;
  message?: string;
  upVotes?: number,
  downVotes?: number,
  url: string;
}

