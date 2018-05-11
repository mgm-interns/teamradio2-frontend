import { StationItemsMap } from 'Models/index';

export interface IStationsListState {
  data: StationItemsMap;
  error: string;
  loading: boolean;
}
