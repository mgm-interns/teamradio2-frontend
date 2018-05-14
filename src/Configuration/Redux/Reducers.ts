import { IStationsListState, stationsReducer } from 'Modules/Station/Redux';
import { chatReducer, stationReducer } from 'Modules/Station/Redux/Reducer';
import { IMessage, IStationState } from 'Modules/Station/Redux/Types';
import { favoriteReducer, userReducer } from 'Modules/User/Redux/Reducer';
import { volumeReducer } from 'Modules/Station/Redux/Reducer';
import { IVolume } from 'Modules/Station/Redux/Types/IVolume';
import { IUser } from 'Modules/User/Redux/Types';
import { IFavorite } from 'Modules/User/Redux/Types/Types';
import { combineReducers, Reducer } from 'redux';

// The top-level state object
export interface IApplicationState {
  user: IUser;
  station: IStationState;
  favoriteList: IFavorite;
  chat: IMessage;
  stations: IStationsListState;
  volume: IVolume;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  station: stationReducer,
  favoriteList: favoriteReducer,
  chat: chatReducer,
  stations: stationsReducer,
  volume: volumeReducer,
});
