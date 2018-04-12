import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IUser } from '../Types';

const userInitialState: IUser = {
  userInfo: null,
};

export const userReducer: Reducer<IUser> = (
  state: IUser = userInitialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_PROFILE:
      return {userInfo : action.payload};
    default:
      return state;
  }
};
