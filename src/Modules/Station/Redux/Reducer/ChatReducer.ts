import { Reducer } from 'redux';
import { chatTypes } from '../Constants';
import { IMessage } from '../Types';

const initialState: IMessage = {
  message: null,
};

export const chatReducer: Reducer<IMessage> = (
  state: IMessage = initialState,
  action,
) => {
  switch (action.type) {
    case chatTypes.STATION_CHAT_UPDATED: {
      return {
        ...state,
        message: action.payload.data,
      };
    }
    default:
      return state;
  }
};
