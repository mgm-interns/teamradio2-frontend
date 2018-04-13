import { Station } from 'Models/Station';
import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IStationState } from '../Types';

// Type-safe initialState
export const initialState: IStationState = {
  nowPlaying: null,
  playlist: [],
  station: new Station(),
  users: [],
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
    case actionTypes.STATION_GET_STATION_BY_ID_UPDATED: {
      const currentState = JSON.stringify({
        station: state.station,
        users: state.users,
      });
      const nextState = JSON.stringify({
        station: action.payload.stationDTO,
        users: action.payload.users,
      });
      if (nextState === currentState) {
        return state;
      }
      return {
        ...state,
        station: action.payload.stationDTO,
        users: action.payload.users,
      };
    }
    default:
      return state;
  }
};
