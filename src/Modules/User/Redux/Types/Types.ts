import { RegisteredUser } from 'Models';
import {IFavoriteItem} from "../../../Station/Components/PlaylistTabs/Favorite";

export interface IUser {
  userInfo: RegisteredUser;
  error?: string | null;
  loading?: boolean;
  isAuthenticated?: boolean;
}

export interface IFavorite {
  favoriteList: IFavoriteItem[];
}
