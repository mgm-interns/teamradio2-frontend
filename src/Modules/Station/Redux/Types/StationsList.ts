import { StationItemsMap } from 'Models';

export interface IStationsListState {
  data: StationItemsMap;
  error: string;
  loading: boolean;
}
