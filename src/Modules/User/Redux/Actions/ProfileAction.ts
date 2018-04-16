import { RegisteredUser } from 'Models/User';
import { ActionCreator } from 'redux';
import { actionTypes } from '../Constants';

export const updateUserInfo: ActionCreator<any> = (
  userInfoUpdated: RegisteredUser,
) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: { userInfoUpdated },
});
