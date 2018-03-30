import { sampleConstants } from '../Constants';

export interface IUserState {
  data: object;
  error?: string | null;
  loading?: boolean;
  isAuthenticated?: boolean;
}

export interface IUserInfo {
  name: string;
  id: number;
}

import { Action } from 'redux';

export interface IUserListUpdateAction extends Action {
  type: typeof sampleConstants.USERS_LIST_UPDATED;
  payload: {
    users: IUserInfo[];
  };
}

export type UserActions = IUserListUpdateAction;
