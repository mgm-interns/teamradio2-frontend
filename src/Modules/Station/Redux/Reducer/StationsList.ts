import { Reducer } from 'redux';
import { stationsListActionTypes } from '../Constants';
import { IStationsListState } from '../Types';

export const stationsListInitialState: IStationsListState = {
  data: null,
  error: '',
  loading: true,
};

export const stationsReducer: Reducer<IStationsListState> = (
  state: IStationsListState = stationsListInitialState,
  action,
) => {
  switch (action.type) {
    case stationsListActionTypes.STATIONS_LIST_CONNECTED:
      return state;
    case stationsListActionTypes.STATIONS_LIST_CLOSED:
      return state;
    case stationsListActionTypes.STATIONS_LIST_ERROR:
      return state;
    case stationsListActionTypes.STATIONS_LIST_UPDATE:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
