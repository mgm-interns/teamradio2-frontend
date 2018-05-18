import { StationInfo } from 'Models';

export interface IStationsListState {
  data: StationInfo[];
  error: string;
  loading: boolean;
}
