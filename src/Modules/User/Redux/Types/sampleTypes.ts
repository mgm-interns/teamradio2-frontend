import { sampleConstants } from "../Constants";

export interface UserState {
  data: object,
  error?: string | null,
  loading?: boolean,
  isAuthenticated?: boolean,
}

export interface UserInfo {
  name: string,
  id: number,
}

import { Action } from 'redux';

export interface UserListUpdateAction extends Action {
  type: typeof sampleConstants.USERS_LIST_UPDATED,
  payload: {
    users: UserInfo[];
  }
}

export type UserActions = UserListUpdateAction;
