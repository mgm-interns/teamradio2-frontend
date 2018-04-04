import { ActionCreator } from 'redux';
import { ISong } from '../Types';
import { actionTypes } from '../Constants';

export const addSong: ActionCreator<any> = (song: ISong) => ({
  type: actionTypes.ADD_SONG,
  payload: {
    data: song,
  },
});
