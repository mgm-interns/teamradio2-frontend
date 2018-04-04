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
      console.log(action);
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
