import { IStationsListState, stationsReducer } from 'Modules/Station/Redux';
import {
  stationReducer,
  volumeReducer,
} from 'Modules/Station/Redux/Reducer';
import { IStationState } from 'Modules/Station/Redux/Types';
import { IVolume } from 'Modules/Station/Redux/Types/IVolume';
import { favoriteReducer, userReducer } from 'Modules/User/Redux/Reducer';
import { IUser } from 'Modules/User/Redux/Types';
import { IFavorite } from 'Modules/User/Redux/Types/Types';
import { combineReducers, Reducer } from 'redux';

// The top-level state object
export interface IApplicationState {
  user: IUser;
  station: IStationState;
  favoriteList: IFavorite;
  stations: IStationsListState;
  volume: IVolume;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  station: stationReducer,
  favoriteList: favoriteReducer,
  stations: stationsReducer,
  volume: volumeReducer,
});
