import { combineReducers, Reducer } from 'redux';

import { userReducer } from '../../Modules/User/Redux/Reducer';
import { IUserState } from '../../Modules/User/Redux/Types';

import { playlistReducer } from '../../Modules/Station/Redux/Reducer';
import { IPlaylistState } from '../../Modules/Station/Redux/Types';

// The top-level state object
export interface IApplicationState {
  user: IUserState;
  playlist: IPlaylistState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
});
