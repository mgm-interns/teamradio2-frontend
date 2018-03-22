import { combineReducers, Reducer } from 'redux';

import userReducer from '../../Modules/User/Redux/Reducer';
import { UserState } from "../../Modules/User/Redux/Types";

// The top-level state object
export interface ApplicationState {
  user: UserState
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: userReducer,
});