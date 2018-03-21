import { Reducer } from 'redux';
import { UserState } from '../Types';
import { FETCH_USER } from '../Constants';
import { FetchUserAction } from "../Actions";

export default function userReducer(state: UserState, action: FetchUserAction): UserState {
  switch (action.type) {
    // case FETCH_USER:
    //   return {...state, data: state.id + 1};
  }
  return state;
}