import { RegisteredUser } from 'Models';
import { ActionCreator } from 'redux';
import {IFavoriteItem} from "../../../Station/Components/PlaylistTabs/Favorite/FavoriteItem";
import { actionTypes } from '../Constants';

export const updateUserInfo: ActionCreator<any> = (
  userInfo: RegisteredUser,
) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: userInfo,
});

export const addFavorite: ActionCreator<any> = (
  favorite: IFavoriteItem,
) => ({
  type: actionTypes.ADD_FAVORITE,
  payload: favorite,
});

export const removeFavorite: ActionCreator<any> = (
  songId: string,
) => ({
  type: actionTypes.REMOVE_FAVORITE,
  payload: songId,
});

export const updateNewestFavoriteList: ActionCreator<any> = (
  favoriteList: IFavoriteItem[],
) => ({
  type: actionTypes.UPDATE_NEWEST_FAVORITE_LIST,
  payload: favoriteList,
});
