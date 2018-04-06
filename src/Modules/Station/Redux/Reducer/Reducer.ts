import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IPlaylistState } from '../Types';

// Type-safe initialState
export const initialState: IPlaylistState = {
  data: [],
  error: '',
  loading: false,
};

export const playlistReducer: Reducer<IPlaylistState> = (
  state: IPlaylistState = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.ADD_SONG:
      return { ...state, data: [...state.data, action.payload.data] };
    case actionTypes.SHIFT_SONG:
      return { ...state, data: state.data.slice(1) };
    case actionTypes.STATION_PLAYLIST_UPDATED:
      return {
        ...state,
        data: action.payload.listSong,
      };
    default:
      return state;
  }
};
