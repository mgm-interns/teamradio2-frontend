import { actionTypes } from 'Modules/User/Redux/Constants';
import { Reducer } from 'redux';
import { IUser } from '../Types';

const userInitialState: IUser = {
  userInfo: null,
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
