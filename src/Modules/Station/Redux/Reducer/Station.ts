import { Reducer } from 'redux';
import { actionTypes, stationTypes } from '../Constants';
import { IStationState } from '../Types';

// Type-safe initialState
export const initialState: IStationState = {
  nowPlaying: null,
  playlist: [],
  stationInfo: {},
  joinUser: [],
  leaveUser: [],
  error: '',
  loading: false,
};

export const stationReducer: Reducer<IStationState> = (
  state: IStationState = initialState,
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
    case stationTypes.STATION_GET_STATION_BY_ID_CONNECTED: {
      return state;
    }
    case stationTypes.STATION_GET_STATION_BY_ID_ERROR:
      return state;
    case stationTypes.STATION_GET_STATION_BY_ID_CLOSED:
      return state;
    case stationTypes.STATION_GET_STATION_BY_ID_UPDATED: {
      return {
        ...state,
        stationInfo: action.payload.stationInfo,
        joinUser: action.payload.joinUser,
        leaveUser: action.payload.leaveUser,
      };
    }
    default:
      return state;
  }
};
