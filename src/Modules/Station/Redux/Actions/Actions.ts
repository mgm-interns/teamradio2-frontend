import { ActionCreator } from 'redux';
import { ISong } from '../Types';
import { actionTypes } from '../Constants';

const addSong: ActionCreator<any> = (song: ISong) => ({
  type: actionTypes.ADD_SONG,
  payload: {
    data: song,
  },
});
