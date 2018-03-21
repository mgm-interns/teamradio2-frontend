import { Action } from 'redux';
import * as constants from '../Constants/index';

export interface FetchUserAction {
  type: constants.FETCH_USER;
  payload: {}
}
