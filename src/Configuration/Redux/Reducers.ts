import { combineReducers, Reducer } from 'redux';

import { userReducer } from 'Modules/User/Redux/Reducer';
import { IUserState } from 'Modules/User/Redux/Types';

import { stationReducer } from 'Modules/Station/Redux/Reducer';
import { IStationState } from 'Modules/Station/Redux/Types';

// The top-level state object
export interface IApplicationState {
  user: IUserState;
  station: IStationState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  station: stationReducer,
});
