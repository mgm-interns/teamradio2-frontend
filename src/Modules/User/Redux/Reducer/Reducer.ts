import { Reducer } from 'redux';
import { sampleConstants } from '../Constants';
import { IUserState } from '../Types';

// Type-safe initialState
export const initialState: IUserState = {
  data: {},
  error: '',
  loading: false,
  isAuthenticated: false,
};

export const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action,
) => {
  switch (action.type) {
    case sampleConstants.USERS_LIST_UPDATED:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
