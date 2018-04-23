import { ActionCreator } from 'redux';
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

export const toggleQRCode: ActionCreator<any> = (isToggleQRCode: boolean) => ({
  type: actionTypes.TOGGLE_QR_CODE,
  payload: isToggleQRCode,
});
