import { playlistReducer } from 'Modules/Station/Redux/Reducer';
import { IPlaylistState } from 'Modules/Station/Redux/Types';
import { profileReducer, userReducer } from 'Modules/User/Redux/Reducer';
import { IUser, IUserState } from 'Modules/User/Redux/Types';
import { combineReducers, Reducer } from 'redux';

// The top-level state object
export interface IApplicationState {
  user: IUserState;
  playlist: IPlaylistState;
  userInfo: IUser;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
  userInfo: profileReducer,
});
