import { RegisteredUser } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { ActionCreator } from 'redux';
import { actionTypes } from '../Constants';

export const updateUserInfo: ActionCreator<any> = (
  userInfo: RegisteredUser,
) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: userInfo,
});

export const addFavorite: ActionCreator<any> = (
  favorite: FavoriteSongItem,
) => ({
  type: actionTypes.ADD_FAVORITE,
  payload: favorite,
});

export const removeFavorite: ActionCreator<any> = (songId: string) => ({
  type: actionTypes.REMOVE_FAVORITE,
  payload: songId,
});

export const updateNewestFavoriteList: ActionCreator<any> = (
  favoriteList: FavoriteSongItem[],
) => ({
  type: actionTypes.UPDATE_NEWEST_FAVORITE_LIST,
  payload: favoriteList,
});
