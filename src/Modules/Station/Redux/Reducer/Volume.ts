import { localStorageManager } from 'Helpers/LocalStorageManager';
import { Reducer } from 'redux';
import { volumeActionTypes } from '../Constants';
import { IVolume } from '../Types';

// Type-safe initialState
export const initialVolumeState: IVolume = {
  playerVolume: localStorageManager.getVolumeSource().playerVolume,
  previewVolume: localStorageManager.getVolumeSource().previewVolume,
  isUserMutePlayer: localStorageManager.getVolumeSource().isUserMutePlayer,
};

export const volumeReducer: Reducer<IVolume> = (
  state: IVolume = initialVolumeState,
  action,
) => {
  switch (action.type) {
    case volumeActionTypes.SET_VOLUME:
      return {
        ...state,
        playerVolume: action.payload.playerVolume,
        previewVolume: action.payload.previewVolume,
      };
    case volumeActionTypes.USER_MUTE_PLAYER:
      return {
        ...state,
        isUserMutePlayer: action.payload,
      };
    default:
      return state;
  }
};
