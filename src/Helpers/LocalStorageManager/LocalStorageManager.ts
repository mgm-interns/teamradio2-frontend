import { AccessToken, RegisteredUser } from 'Models/User';

const accessTokenKey = 'accessToken';
const userInfoKey = 'userInfo';

export const localStorageManager = {
  getAccessToken: (): AccessToken => {
    const accessToken = localStorage.getItem(accessTokenKey);
    return accessToken ? JSON.parse(accessToken) : null;
  },
  setAccessToken: (token: AccessToken) => {
    localStorage.setItem(accessTokenKey, JSON.stringify(token));
  },
  removeAccessToken: () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(userInfoKey);
  },
  setUserInfo: (userInfo: RegisteredUser) => {
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  },
  getUserInfo: (): RegisteredUser => {
    return JSON.parse(localStorage.getItem(userInfoKey));
  },
};
