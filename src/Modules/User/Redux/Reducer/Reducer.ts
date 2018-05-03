import { localStorageManager } from 'Helpers';
import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IUser } from '../Types';

const userInitialState: IUser = {
  userInfo: { ...localStorageManager.getUserInfo() },
  error: '',
  loading: false,
  isAuthenticated: false,
};

export const userReducer: Reducer<IUser> = (
  state: IUser = userInitialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_PROFILE:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
