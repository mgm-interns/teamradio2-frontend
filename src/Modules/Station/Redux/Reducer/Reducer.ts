import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IPlaylistState } from '../Types';

// Type-safe initialState
export const initialState: IPlaylistState = {
  nowPlaying: null,
  playlist: [],
  error: '',
  loading: false,
};

export const playlistReducer: Reducer<IPlaylistState> = (
  state: IPlaylistState = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.ADD_SONG:
      return { ...state, playlist: [...state.playlist, action.payload.data] };
    case actionTypes.SHIFT_SONG:
      return { ...state, playlist: state.playlist.slice(1) };
    case actionTypes.STATION_PLAYLIST_UPDATED: {
      const currentState = JSON.stringify({
        nowPlaying: state.nowPlaying,
        playlist: state.playlist,
      });
      const nextState = JSON.stringify({
        nowPlaying: action.payload.nowPlaying,
        playlist: action.payload.listSong,
      });
      // Keep the old state to prevent re render components
      if (currentState === nextState) {
        return state;
      }
      // Or else it will create a new object with data
      return {
        ...state,
        nowPlaying: action.payload.nowPlaying,
        playlist: action.payload.listSong,
      };
    }
    default:
      return state;
  }
};
