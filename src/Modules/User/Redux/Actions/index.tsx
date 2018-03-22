import { ActionCreator } from 'redux';
import { USERS_LIST_UPDATED } from '../Constants';

import { UserListUpdateAction, UserInfo } from '../Types';

export const updateUserList: ActionCreator<UserListUpdateAction> = (users: UserInfo[]) => ({
  type: USERS_LIST_UPDATED,
  payload: {
    users,
  }
});
