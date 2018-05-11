import { RegisteredUser, Station, StationItemsMap } from 'Models';

export interface IStationsListState {
  data: StationItemsMap;
  error: string;
  loading: boolean;
  station: Station,
  users: RegisteredUser[];
}
