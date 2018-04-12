import { playlistReducer, userReducer } from 'Modules/Station/Redux/Reducer';
import { IPlaylistState } from 'Modules/Station/Redux/Types';
import { IUserState } from 'Modules/User/Redux/Types';
import { combineReducers, Reducer } from 'redux';
import { RegisteredUser } from "../../Models/User";

// The top-level state object
export interface IApplicationState {
  user: IUserState;
  playlist: IPlaylistState;
  userInfo: RegisteredUser;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
  userInfo: userReducer,
});
