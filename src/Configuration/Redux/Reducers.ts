import { combineReducers, Reducer } from 'redux';

import { userReducer } from '../../Modules/User/Redux/Reducer';
import { IUserState } from '../../Modules/User/Redux/Types';

// The top-level state object
export interface IApplicationState {
  user: IUserState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
});
