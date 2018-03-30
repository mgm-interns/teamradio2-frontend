import { ActionCreator } from 'redux';
import { sampleConstants } from '../Constants';
import { IUserInfo, IUserListUpdateAction } from '../Types';

const updateUserList: ActionCreator<IUserListUpdateAction> = (
  users: IUserInfo[],
) => ({
  type: sampleConstants.USERS_LIST_UPDATED,
  payload: {
    users,
  },
});

export const sampleActions = {
  updateUserList,
};
