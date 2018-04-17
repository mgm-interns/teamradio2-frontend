import { playlistReducer } from 'Modules/Station/Redux/Reducer';
import { IPlaylistState } from 'Modules/Station/Redux/Types';
import { userReducer } from 'Modules/User/Redux/Reducer';
import { IUser } from 'Modules/User/Redux/Types';
import { combineReducers, Reducer } from 'redux';

// The top-level state object
export interface IApplicationState {
  user: IUser;
  playlist: IPlaylistState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
});
