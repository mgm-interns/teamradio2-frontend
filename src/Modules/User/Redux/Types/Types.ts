import { RegisteredUser } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';

export interface IUser {
  userInfo: RegisteredUser;
  error?: string | null;
  loading?: boolean;
  isAuthenticated?: boolean;
}

export interface IFavorite {
  favoriteList: FavoriteSongItem[];
}
