import { Reducer } from 'redux';
import { actionTypes } from './Constants';
import { IStationsListState } from './Types';

export const initialState: IStationsListState = {
  data: null,
  error: '',
  loading: true,
};

export const stationsReducer: Reducer<IStationsListState> = (
  state: IStationsListState = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.STATIONS_LIST_CONNECTED:
      return state;
    case actionTypes.STATIONS_LIST_CLOSED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STATIONS_LIST_ERROR:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STATIONS_LIST_UPDATE:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
