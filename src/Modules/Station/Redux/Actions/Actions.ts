import { ActionCreator } from 'redux';
import { RegisteredUser } from "../../../../Models/User";
import { actionTypes } from '../Constants';
import { ISong } from '../Types';

export const addSong: ActionCreator<any> = (song: ISong) => ({
  type: actionTypes.ADD_SONG,
  payload: {
    data: song,
  },
});

export const shiftSong: ActionCreator<any> = (song: ISong) => ({
  type: actionTypes.SHIFT_SONG,
  payload: {},
});

export const updateUserInfo: ActionCreator<any> = (userInfoUpdated: RegisteredUser) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: {userInfoUpdated},
});
