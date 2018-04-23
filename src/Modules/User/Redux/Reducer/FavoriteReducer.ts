import { Reducer } from 'redux';
import { actionTypes } from '../Constants';
import { IFavorite } from '../Types';

const favoriteInitialState: IFavorite = {
  favoriteList: [],
};

export const favoriteReducer: Reducer<IFavorite> = (
  state: IFavorite = favoriteInitialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favoriteList: state.favoriteList.concat(action.payload),
      };
    case actionTypes.UPDATE_NEWEST_FAVORITE_LIST:
      return { ...state, favoriteList: action.payload };
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favoriteList: state.favoriteList.filter(
          item => item.songId !== action.payload,
        ),
      };
    default:
      return state;
  }
};
