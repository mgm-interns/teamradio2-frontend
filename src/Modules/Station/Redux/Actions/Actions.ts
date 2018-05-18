import { ActionCreator } from 'redux';
import { actionTypes, volumeActionTypes } from '../Constants';
import { ISong, IVolume } from '../Types';

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

export const setVolume: ActionCreator<any> = (volume: IVolume) => ({
  type: volumeActionTypes.SET_VOLUME,
  payload: { ...volume },
});

export const userMutePlayer: ActionCreator<any> = (playerVolume: boolean) => ({
  type: volumeActionTypes.USER_MUTE_PLAYER,
  payload: playerVolume,
});
