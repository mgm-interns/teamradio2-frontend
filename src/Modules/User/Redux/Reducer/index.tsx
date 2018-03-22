import { Reducer } from 'redux';
import { UserState } from '../Types';
import { USERS_LIST_UPDATED } from "../Constants";

// Type-safe initialState
export const initialState: UserState = {
  data: {},
  error: '',
  loading: false,
  isAuthenticated: false,
};

const userReducer: Reducer<UserState> = (state: UserState = initialState, action) => {
  switch (action.type) {
    case USERS_LIST_UPDATED:
      return {...state, data: action.data};
    default:
      return state;
  }
};

export default userReducer;