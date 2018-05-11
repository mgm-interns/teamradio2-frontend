import { Station } from 'Models/Station';
import { Reducer } from 'redux';
import { actionTypes } from './Constants';
import { IStationsListState } from './Types';

export const initialState: IStationsListState = {
  data: null,
  error: '',
  loading: true,
  station: new Station(),
  users: [],
};

export const stationsReducer: Reducer<IStationsListState> = (
  state: IStationsListState = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.STATIONS_LIST_CONNECTED:
      return state;
    case actionTypes.STATIONS_LIST_CLOSED:
      return state;
    case actionTypes.STATIONS_LIST_ERROR:
      return state;
    case actionTypes.STATIONS_LIST_UPDATE:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    // case actionTypes.STATION_GET_STATION_BY_ID_CONNECTED:
    //   return state;
    // case actionTypes.STATION_GET_STATION_BY_ID_ERROR:
    //   return state;
    // case actionTypes.STATION_GET_STATION_BY_ID_CLOSED:
    //   return state;
    case actionTypes.STATION_GET_STATION_BY_ID_UPDATED: {
      console.log(action.payload);
      return {
        ...state,
        station: action.payload.data,
      };
    }
    default:
      return state;
  }
};
