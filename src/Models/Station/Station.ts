import { Song } from '../Song';
import { StationInfo } from './StationInfo';

export enum StationPrivacy {
  STATION_PUBLIC = 'station_public',
  STATION_PRIVATE = 'station_private',
}

export class Station {
  public playlist: any[];
  public nowPlaying: Song;
  public stationInfo: StationInfo;
  public joinUser: string[];
  public leaveUser: string[];
  public error: string;
  public loading: boolean;
}
