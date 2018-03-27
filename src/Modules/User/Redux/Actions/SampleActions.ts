import { ActionCreator } from 'redux';
import { sampleConstants } from '../Constants';

import { UserListUpdateAction, UserInfo } from '../Types';

const updateUserList: ActionCreator<UserListUpdateAction> = (users: UserInfo[]) => ({
  type: sampleConstants.USERS_LIST_UPDATED,
  payload: {
    users,
  }
});

export const sampleActions = {
  updateUserList: updateUserList
};